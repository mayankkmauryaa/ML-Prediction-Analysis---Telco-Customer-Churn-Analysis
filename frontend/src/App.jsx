import React from 'react';
import ChurnForm from './components/ChurnForm';
import ModelMetrics from './components/ModelMetrics';
import DatasetPreview from './components/DatasetPreview';
import Charts from './components/Charts';

export default function App() {
  return (
    <div className="min-h-screen max-w-screen min-w-screen bg-gray-950 p-6">
      <h1 className="text-3xl font-bold text-amber-400 mb-6 text-center">
        Telco Customer Churn Dashboard
      </h1>

      {/* Form & Metrics side by side on larger screens */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
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
    </div>
  );
}
