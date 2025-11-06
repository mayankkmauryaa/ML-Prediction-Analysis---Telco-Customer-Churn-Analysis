import React, { useState } from 'react';

const initialForm = {
    gender: 'Male',
    SeniorCitizen: 0,
    Partner: 'No',
    Dependents: 'No',
    tenure: 12,
    PhoneService: 'Yes',
    MultipleLines: 'No',
    InternetService: 'Fiber optic',
    OnlineSecurity: 'No',
    OnlineBackup: 'No',
    DeviceProtection: 'No',
    TechSupport: 'No',
    StreamingTV: 'No',
    StreamingMovies: 'No',
    Contract: 'Month-to-month',
    PaperlessBilling: 'Yes',
    PaymentMethod: 'Electronic check',
    MonthlyCharges: 70.0,
    TotalCharges: 840.0,
    avg_monthly_spend: 70.0,
    services_count: 3,
    has_internet: 1,
    is_new_customer: 0,
    high_monthly: 1
};

export default function ChurnForm() {
    const [form, setForm] = useState(initialForm);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [log, setLog] = useState([]); // <-- store input/output logs

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: isNaN(value) ? value : parseFloat(value)
        }));
    }

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            setResult(data);

            // Add to log
            setLog(prev => [
                { input: { ...form }, output: data, timestamp: new Date().toLocaleTimeString() },
                ...prev
            ]);

        } catch (err) {
            console.error(err);
            setResult({ error: 'Request failed' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-amber-100 text-black p-6 rounded-xl shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-amber-400">Customer Churn Predictor</h2>
            <form onSubmit={submit} className="space-y-4">
                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-semibold">Gender</label>
                        <select name="gender" value={form.gender} onChange={handleChange} className="w-full p-2 rounded text-black">
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Tenure (months)</label>
                        <input type="number" name="tenure" value={form.tenure} onChange={handleChange} className="w-full p-2 rounded text-black" />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Monthly Charges</label>
                        <input type="number" step="0.01" name="MonthlyCharges" value={form.MonthlyCharges} onChange={handleChange} className="w-full p-2 rounded text-black" />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Contract</label>
                        <select name="Contract" value={form.Contract} onChange={handleChange} className="w-full p-2 rounded text-black">
                            <option>Month-to-month</option>
                            <option>One year</option>
                            <option>Two year</option>
                        </select>
                    </div>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-amber-400 text-white font-bold py-2 rounded hover:bg-amber-300 transition">
                    {loading ? 'Predicting...' : 'Predict'}
                </button>
            </form>

            {result && (
                <div className={`mt-4 p-4 rounded shadow-md ${result.prediction === 1 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    <h3 className="text-lg font-bold">{result.prediction === 1 ? '🔴 Customer likely to churn' : '🟢 Customer will stay'}</h3>
                    <p>Probability: {(result.probability * 100).toFixed(2)}%</p>
                </div>
            )}

            {log.length > 0 && (
                <div className="mt-6 max-h-64 overflow-y-auto bg-gray-700 p-4 rounded text-green-500">
                    <h3 className="text-lg font-bold mb-2 text-amber-300">API Call Log</h3>
                    {log.map((entry, idx) => (
                        <div key={idx} className="mb-2 p-2 border-b border-gray-600">
                            <p className="text-sm"><strong className='text-cyan-100'>Time:</strong> {entry.timestamp}</p>
                            <p className="text-sm"><strong className='text-cyan-100'>Input:</strong> {JSON.stringify(entry.input)}</p>
                            <p className="text-sm"><strong className='text-cyan-100'>Output:</strong> {JSON.stringify(entry.output)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
}
