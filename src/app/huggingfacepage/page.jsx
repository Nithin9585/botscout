'use client';
import React, { useEffect, useState } from 'react';

function HuggingFacePages() {
  const [models, setModels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/huggingface'); 
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setModels(data); 
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-10 bg-gray-100 min-h-screen ml-20">
      <h1 className="text-3xl font-bold text-center mb-6">Top 10 Hugging Face Models</h1>
      {error && <p className="text-red-500 text-center">Error: {error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <div key={model._id} className="bg-white shadow-md rounded-lg p-4 border">
            <h2 className="text-xl font-semibold mb-2">{model.modelId}</h2>
            <p className="text-gray-600 mb-1"><strong>Pipeline:</strong> {model.pipeline_tag}</p>
            <p className="text-gray-600 mb-1"><strong>Likes:</strong> {model.likes}</p>
            <p className="text-gray-600 mb-1"><strong>Downloads:</strong> {model.downloads}</p>
            <div className="mt-2">
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-md">{model.library_name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HuggingFacePages;
