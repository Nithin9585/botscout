'use client';
import React, { useEffect, useState } from 'react';

function Arxivpages() {
  const [arxivData, setArxivData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/Arxivpages');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setArxivData(data); // Store the fetched data
      } catch (error) {
        setError(error.message); // Handle any errors
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-black bg-white m-25">
      <h1>Arxiv Pages</h1>
      {error && <p>Error: {error}</p>}
      {arxivData.length > 0 ? (
        <div>
          {arxivData.map((entry, index) => (
            <div key={index} className="arxiv-entry">
              <h2>
                <a href={entry.id} target="_blank" rel="noopener noreferrer">
                  {entry.title}
                </a>
              </h2>
              <p>{entry.summary}</p>
              <p>Published on: {entry.published}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Arxivpages;
