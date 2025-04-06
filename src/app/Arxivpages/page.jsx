'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
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
        setArxivData(data);
      } catch (error) {
        setError(error.message); 
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
            <div key={index} className="arxiv-entry m-4 border-2 p-4 rounded-lg shadow-md">
              <h2 className='text-2xl font-bold m-2'>
                <a href={entry.id} target="_blank" rel="noopener noreferrer">
                  {entry.title}
                </a>
              </h2>
              <p className='p-5 border-2 rounded-lg '>{entry.summary}</p>
              <p className=' m-4'>Published on: {entry.published}</p>
              <Button className='m-4' variant="outline">Download</Button>
              <Button className='m-4' variant="outline">Download</Button>

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
