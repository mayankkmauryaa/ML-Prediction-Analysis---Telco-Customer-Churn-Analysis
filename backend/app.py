import os
from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
from flask_cors import CORS
from flask import send_file

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'model', 'churn_artifact.pkl')

artifact = joblib.load(MODEL_PATH)
model = artifact['model']
preprocessor = artifact['preprocessor']
feature_cols = artifact['feature_cols']

@app.route('/')
def home():
    return "Telco Churn Prediction API is running!"

@app.route('/health', methods=['GET'])
def health():
    print("[GET] /health called")
    return jsonify({'status':'ok'})

@app.route('/dataset', methods=['GET'])
def dataset_preview():
    # Load dataset
    df = pd.read_csv(os.path.join(BASE_DIR, 'Telco-Customer-Churn.csv'))
    # Return first 100 rows as JSON
    return jsonify(df.head(100).to_dict(orient='records'))

@app.route('/charts/<chart_name>', methods=['GET'])
def get_chart(chart_name):
    chart_path = os.path.join(BASE_DIR, 'static', 'charts', chart_name)
    if os.path.exists(chart_path):
        return send_file(chart_path, mimetype='image/png')
    return jsonify({"error": "Chart not found"}), 404

@app.route('/predict', methods=['POST'])
def predict():
    # Receive input
    data = request.get_json()
    print("[POST] /predict input:", data)  # 🔹 Print input

    # Convert to DataFrame
    try:
        df = pd.DataFrame([data], columns=feature_cols)
    except Exception as e:
        df = pd.DataFrame([data])
        for c in feature_cols:
            if c not in df.columns:
                df[c] = np.nan
        df = df[feature_cols]

    # Feature engineering (if avg_monthly_spend or others exist)
    if 'avg_monthly_spend' in df.columns and 'TotalCharges' in df.columns and 'tenure' in df.columns:
        df['avg_monthly_spend'] = df.apply(lambda r: r['TotalCharges']/r['tenure'] if r['tenure']>0 else r['MonthlyCharges'], axis=1)

    # Preprocess and predict
    try:
        X_proc = preprocessor.transform(df[preprocessor.feature_names_in_])
    except Exception as e:
        X_proc = df  # fallback if no preprocessor

    try:
        pred = int(model.predict(df)[0])
        proba = float(model.predict_proba(df)[0][1])
    except Exception:
        pred = int(model.predict(X_proc)[0])
        try:
            proba = float(model.predict_proba(X_proc)[0][1])
        except Exception:
            proba = None

    label = "Customer likely to churn" if pred==1 else "Customer will stay"
    status = "churn" if pred==1 else "stay"

    # Prepare output
    output = {'prediction': pred, 'label': label, 'probability': proba, 'status': status}
    
    print("[POST] /predict output:", output)  # 🔹 Print output

    return jsonify(output)

@app.route('/models', methods=['GET'])
def models_info():
    """
    Returns the exact model performance metrics from notebook results.
    """
    model_metrics = {
        "LogisticRegression": {"accuracy": 0.8062, "f1": 0.6061, "roc_auc": 0.8419},
        "DecisionTree": {"accuracy": 0.7282, "f1": 0.4993, "roc_auc": 0.6585},
        "KNN": {"accuracy": 0.7637, "f1": 0.5530, "roc_auc": 0.7874},
        "SVM": {"accuracy": 0.7949, "f1": 0.5628, "roc_auc": 0.7937},
        "GaussianNB": {"accuracy": 0.6927, "f1": 0.5911, "roc_auc": 0.8064},
        "RandomForest": {"accuracy": 0.7857, "f1": 0.5438, "roc_auc": 0.8223},
        "ExtraTrees": {"accuracy": 0.7700, "f1": 0.5291, "roc_auc": 0.7922},
        "AdaBoost": {"accuracy": 0.8020, "f1": 0.5854, "roc_auc": 0.8451},
        "GradientBoosting": {"accuracy": 0.7913, "f1": 0.5559, "roc_auc": 0.8376},
        "XGBoost": {"accuracy": 0.7864, "f1": 0.5580, "roc_auc": 0.8210}
    }

    return jsonify(model_metrics)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
