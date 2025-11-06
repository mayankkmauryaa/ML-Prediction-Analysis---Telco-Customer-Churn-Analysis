# Telco Customer Churn Analysis & Prediction Dashboard

**GitHub Repository:** [ML-Prediction-Analysis - Telco Customer Churn Analysis](https://github.com/mayankkmauryaa/ML-Prediction-Analysis---Telco-Customer-Churn-Analysis)

---

## Project Overview

This project provides a **complete machine learning analysis** and **prediction dashboard** for Telco customer churn.  
It includes:

- Prediction of customer churn using multiple ML models.
- Model performance evaluation: accuracy, F1-score, ROC-AUC.
- Confusion matrices, ROC curves, feature importance charts, and insights.
- Frontend dashboard to visualize predictions, model metrics, charts, and dataset preview.

**Stack Used:**

- **Backend:** Python, Flask, Pandas, Scikit-learn, XGBoost
- **Frontend:** React.js, TailwindCSS
- **Other:** Joblib for model serialization, Matplotlib & Seaborn for charts

---

## Backend Structure

```structure

backend/
│
├── app.py # Flask main app with routes
├── model/
│ └── churn_artifact.pkl # Trained ML model + preprocessor
├── static/
│ └── charts/ # All generated charts as PNGs
└── Telco-Customer-Churn.csv

```

---

## Backend Routes

| Route                  | Method | Description                                                                              |
| ---------------------- | ------ | ---------------------------------------------------------------------------------------- |
| `/`                    | GET    | Home route, returns a simple running message.                                            |
| `/health`              | GET    | Health check, returns `{"status":"ok"}`.                                                 |
| `/predict`             | POST   | Accepts customer features in JSON and returns prediction, probability, and churn status. |
| `/models`              | GET    | Returns all trained models' performance metrics (accuracy, F1, ROC-AUC).                 |
| `/charts/<chart_name>` | GET    | Returns the chart image by name (e.g., `Confusion Matrix.png`).                          |
| `/dataset`             | GET    | Returns the first 100 rows of the dataset in JSON format.                                |

### `/predict` Example

**Request:**

```json
{
  "gender": "Male",
  "SeniorCitizen": 0,
  "Partner": "No",
  "Dependents": "No",
  "tenure": 12,
  "MonthlyCharges": 70,
  "TotalCharges": 840,
  "Contract": "Month-to-month",
  "avg_monthly_spend": 70,
  "services_count": 3,
  "has_internet": 1,
  "is_new_customer": 0,
  "high_monthly": 1
}
```

**Response:**

```json
{
  "prediction": 1,
  "label": "Customer likely to churn",
  "probability": 0.5828,
  "status": "churn"
}
```

---

## Model Performance Metrics

| Model              | Accuracy | F1-Score | ROC-AUC |
| ------------------ | -------- | -------- | ------- |
| LogisticRegression | 80.62%   | 60.61%   | 84.19%  |
| DecisionTree       | 72.82%   | 49.93%   | 65.85%  |
| KNN                | 76.37%   | 55.30%   | 78.74%  |
| SVM                | 79.49%   | 56.28%   | 79.37%  |
| GaussianNB         | 69.27%   | 59.11%   | 80.64%  |
| RandomForest       | 78.57%   | 54.38%   | 82.23%  |
| ExtraTrees         | 77.00%   | 52.91%   | 79.22%  |
| AdaBoost           | 80.20%   | 58.54%   | 84.51%  |
| GradientBoosting   | 79.13%   | 55.59%   | 83.76%  |
| XGBoost            | 78.64%   | 55.80%   | 82.10%  |

---

## Frontend Features

- Interactive **prediction form**: select features and get churn prediction in real-time.
- **API call log** to track all requests and responses.
- **Model Metrics Table**: displays accuracy, F1-score, ROC-AUC for all models.
- **Charts**: confusion matrices, ROC curves, feature importance, and contract insights.
- **Dataset Preview**: view the first 100 rows with toggle option to hide/show.

---

## How to Run the Project

### 1. Clone the repo

```bash
git clone https://github.com/mayankkmauryaa/ML-Prediction-Analysis---Telco-Customer-Churn-Analysis.git
cd ML-Prediction-Analysis---Telco-Customer-Churn-Analysis
```

---

### 2. Setup Backend

```bash
cd backend
python -m venv venv
# Activate venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

**Run Flask server:**

```bash
python app.py
```

Backend runs at `http://localhost:5000`.

---

### 3. Setup Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at `http://localhost:3000`.

---

### 4. Workflow

1. Open the **dashboard** at `http://localhost:3000`.
2. Use the **prediction form** to predict churn for any customer.
3. View **API logs**, **model performance metrics**, **charts**, and **dataset preview**.

---

## File Structure Overview

```structure
ML-Prediction-Analysis/
│
├── backend/
│   ├── app.py
│   ├── model/
│   │   └── churn_artifact.pkl
│   ├── static/
│   │   └── charts/
│   └── Telco-Customer-Churn.csv
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChurnForm.js
│   │   │   ├── ModelMetrics.js
│   │   │   ├── DatasetPreview.js
│   │   │   └── Charts.js
│   │   └── App.js
│   └── package.json
└── README.md
```

---

## Notes

- All charts are generated in `backend/static/charts/` as PNG files.
- Model metrics and dataset preview are served via backend API.
- The project is responsive, works on large screens, and has consistent chart dimensions.
- Dataset preview shows **first 100 rows** with option to toggle view.

---

## Author

**Mayank Maurya** – BTech Computer Science | [GitHub](https://github.com/mayankkmauryaa)

---
