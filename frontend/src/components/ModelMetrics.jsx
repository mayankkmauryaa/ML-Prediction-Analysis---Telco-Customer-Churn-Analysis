import React, { useEffect, useState } from 'react';

export default function ModelMetrics() {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const res = await fetch('https://ml-prediction-analysis-telco-customer.onrender.com/models');
                const data = await res.json();
                setMetrics(data);
            } catch (err) {
                console.error('Failed to fetch model metrics:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchMetrics();
    }, []);

    if (loading) return <p className="text-white">Loading model metrics...</p>;
    if (!metrics) return <p className="text-red-500">No metrics available.</p>;

    return (
        <div className="mt-6 bg-gray-900 p-4 rounded text-white">
            <h2 className="text-xl font-bold mb-2">Model Performance Metrics</h2>
            <table className="table-auto w-full text-left text-sm border border-gray-700">
                <thead>
                    <tr className="border-b border-gray-700">
                        <th className="px-2 py-1">Model</th>
                        <th className="px-2 py-1">Accuracy</th>
                        <th className="px-2 py-1">F1-Score</th>
                        <th className="px-2 py-1">ROC-AUC</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(metrics).map(([modelName, vals]) => (
                        <tr key={modelName} className="border-b border-gray-700">
                            <td className="px-2 py-1">{modelName}</td>
                            <td className="px-2 py-1">{(vals.accuracy * 100).toFixed(2)}%</td>
                            <td className="px-2 py-1">{(vals.f1 * 100).toFixed(2)}%</td>
                            <td className="px-2 py-1">{(vals.roc_auc * 100).toFixed(2)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
