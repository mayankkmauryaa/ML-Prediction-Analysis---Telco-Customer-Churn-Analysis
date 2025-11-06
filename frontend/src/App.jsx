import React from 'react';
import ChurnForm from './components/ChurnForm';
import ModelMetrics from './components/ModelMetrics';
import DatasetPreview from './components/DatasetPreview';
import Charts from './components/Charts';

export default function App() {
  return (
    <div className="min-h-screen max-w-screen min-w-screen bg-gray-950 p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-amber-400 mb-2 text-center">
        Telco Customer Churn Dashboard
      </h1>
      <p className="text-center text-gray-400 mb-2">
        Developed by Mayank Maurya
      </p>
      <p className="text-center text-gray-400 mb-6">
        Live Deployments: 
        <a href="https://ml-prediction-analysis-telco-customer.onrender.com/" target="_blank" className="text-blue-500 mx-2">Render</a> | 
        <a href="https://ml-prediction-analysis-telco-custom.vercel.app/" target="_blank" className="text-blue-500 mx-2">Vercel</a>
      </p>

      {/* Form & Metrics side by side on larger screens */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 mt-6">
          <ChurnForm />
        </div>
        <div className="md:w-1/2">
          <ModelMetrics />
        </div>
      </div>

      {/* Charts */}
      <Charts />

      {/* Dataset */}
      <DatasetPreview />

      {/* Footer */}
      <footer className="mt-8 text-center text-gray-500">
        © 2025 Mayank Maurya. All rights reserved.
      </footer>
    </div>
  );
}
