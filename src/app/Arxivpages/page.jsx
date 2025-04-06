'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
import OrbitingRingsLoader from '../loading'; // Ensure this exists

function Arxivpages() {
  const [arxivData, setArxivData] = useState([]);
  const [loading, setLoading] = useState(true);
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
        toast({ title: "Success", description: "Data loaded successfully!" });
      } catch (error) {
        setError(error.message);
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <OrbitingRingsLoader /> {/* Your custom loader */}
      </div>
    );
  }

  return (
    <div className="text-black bg-white p-6">
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : arxivData.length > 0 ? (
        <div>
          {arxivData.map((entry, index) => (
            <div key={index} className="arxiv-entry m-4 border-2 p-4 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold m-2">
                <a href={entry.id} target="_blank" rel="noopener noreferrer">
                  {entry.title}
                </a>
              </h2>
              <p className="p-5 border-2 rounded-lg">{entry.summary}</p>
              <p className="m-4">Published on: {entry.published}</p>

              <Button className="m-4" variant="outline">Download</Button>

              <Link href={`/summary/${encodeURIComponent(entry.id)}`}>
                <Button className="m-4" variant="outline">Learn More</Button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No data available.</p>
      )}
    </div>
  );
}

export default Arxivpages;
