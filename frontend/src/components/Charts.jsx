import React from 'react';

export default function Charts() {
    const chartGroups = {
        "Confusion Matrices": ["Confusion Matrix.png"],
        "ROC Curves": ["ROC Curves.png", "ROC.png"],
        "Feature Importance": ["RandomForest Top 20 feature importances.png"],
        "Insights": ["Contract vs Churn.png"]
    };

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4 text-white">Charts</h2>
            {Object.entries(chartGroups).map(([groupName, files]) => (
                <div key={groupName} className="mb-6">
                    <h3 className="text-xl font-semibold mb-2 text-amber-400">{groupName}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {files.map(file => (
                            <div key={file} className="bg-gray-800 p-2 rounded shadow-md flex flex-col items-center justify-center">
                                <img
                                    src={`http://localhost:5000/charts/${encodeURIComponent(file)}`}
                                    alt={file}
                                    className="rounded w-full h-64 object-contain"
                                />
                                <p className="text-white text-center mt-2 font-medium">{file.replace('.png', '')}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
