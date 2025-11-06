import React, { useState, useEffect } from 'react';

export default function DatasetPreview() {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (show && data.length === 0) {
            setLoading(true);
            fetch('http://localhost:5000/dataset?rows=100')  // request first 100 rows
                .then(res => res.json())
                .then(d => setData(d))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [show]);

    const columns = data.length ? Object.keys(data[0]) : [];

    return (
        <div className="mt-6 w-full max-w-full">
            <button
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setShow(prev => !prev)}
            >
                {show ? "Hide Dataset" : "Show Dataset (First 100 rows)"}
            </button>

            {show && (
                <div className="overflow-x-auto max-h-[70vh] bg-gray-900 p-4 rounded shadow-md text-white">
                    {loading ? (
                        <p>Loading dataset...</p>
                    ) : (
                        <table className="table-auto w-full text-left text-sm border-collapse border border-gray-700">
                            <thead className="bg-gray-800 sticky top-0">
                                <tr>
                                    {columns.map(col => (
                                        <th key={col} className="px-2 py-1 border-b border-gray-700">{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-gray-700">
                                        {columns.map(col => (
                                            <td key={col} className="px-2 py-1 border-b border-gray-700">{row[col]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
}
