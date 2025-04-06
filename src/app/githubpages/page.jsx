'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

function GitHubPages() {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('/api/Githubpages');
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub repos');
        }
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className="text-black bg-white p-8 md:ml-20">
      <h1 className="text-3xl font-bold mb-6">🔥 Trending GitHub Repositories</h1>
      {error && <p>Error: {error}</p>}
      {repos.length > 0 ? (
        <div>
          {repos.map((repo, index) => (
            <div
              key={index}
              className="m-4 border-2 p-4 rounded-lg shadow-md bg-gray-50"
            >
              <h2 className="text-2xl font-bold mb-2 text-blue-600">
                <a href={repo.url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
              </h2>
              <p className="text-gray-700 mb-3">{repo.description}</p>
              <div className="text-sm text-gray-600 mb-2">
                ⭐ {repo.stars} stars | 🧠 {repo.language || 'Unknown'}
              </div>
              <div className="flex gap-4 mt-2">
                <Button variant="outline" asChild>
                  <a href={repo.readme_url} target="_blank" rel="noopener noreferrer">
                    View README
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href={repo.url} target="_blank" rel="noopener noreferrer">
                    Visit Repo
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading repositories...</p>
      )}
    </div>
  );
}

export default GitHubPages;
