'use client';

import { useEffect, useState } from 'react';

export default function GitHubSummaries() {
  const [repos, setRepos] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSummarize = async () => {
      try {
        const res = await fetch('/api/Githubpages');
        const data = await res.json();

        setRepos(data);

        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });


        const summaryPromises = data.map(async (repo) => {
          const prompt = `Give a short summary for this GitHub repository:\nName: ${repo.name}\nDescription: ${repo.description || 'No description'}\nLanguage: ${repo.language}`;

          try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
          } catch (err) {
            console.error(`Failed to summarize ${repo.name}:`, err.message);
            return 'Summary unavailable.';
          }
        });

        const summaries = await Promise.all(summaryPromises);
        setSummaries(summaries);
        console.log(summaries)
      } catch (error) {
        console.error('Failed to load or summarize repositories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSummarize();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 md:ml-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-4" />
        <p className="text-lg font-medium text-gray-600">Generating AI summaries, hang tight...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">GitHub Repositories with AI Summaries</h1>
      {repos.map((repo, i) => (
        <div key={repo.id} className="mb-6 p-4 rounded-xl shadow bg-white">
          <h2 className="text-xl font-semibold text-blue-600">
            <a href={repo.url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
          </h2>
          <p className="text-sm text-gray-500">⭐ {repo.stars} — {repo.language}</p>
          <p className="mt-2">{summaries[i]}</p>
        </div>
      ))}
    </div>
  );
}
