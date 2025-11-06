# backend/app.py
from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

artifact = joblib.load('model/churn_artifact.pkl')  # path relative to backend/
model = artifact['model']
preprocessor = artifact['preprocessor']
feature_cols = artifact['feature_cols']

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status':'ok'})

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    # data expected as dict of features matching feature_cols
    # convert to DataFrame with single row
    try:
        df = pd.DataFrame([data], columns=feature_cols)
    except Exception as e:
        # try fallback: construct DataFrame from keys in data
        df = pd.DataFrame([data])
        # reorder/pad missing cols
        for c in feature_cols:
            if c not in df.columns:
                df[c] = np.nan
        df = df[feature_cols]
    # feature engineering same as in notebook (if you added avg_monthly_spend etc to features, compute here)
    # e.g. if avg_monthly_spend is included:
    if 'avg_monthly_spend' in df.columns and ('TotalCharges' in df.columns and 'tenure' in df.columns):
        df['avg_monthly_spend'] = df.apply(lambda r: r['TotalCharges']/r['tenure'] if r['tenure']>0 else r['MonthlyCharges'], axis=1)
    # Preprocess using saved preprocessor & predict
    X_proc = preprocessor.transform(df[preprocessor.feature_names_in_])
    # if model is pipeline with preprocessor we might simply call model.predict on original df:
    try:
        proba = model.predict_proba(df)[0][1]
        pred = int(model.predict(df)[0])
    except Exception:
        # fallback: use model on processed features
        pred = int(model.predict(X_proc)[0])
        try:
            proba = float(model.predict_proba(X_proc)[0][1])
        except Exception:
            proba = None
    label = "Customer likely to churn" if pred==1 else "Customer will stay"
    status = "churn" if pred==1 else "stay"
    return jsonify({'prediction': int(pred), 'label': label, 'probability': proba, 'status':status})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
