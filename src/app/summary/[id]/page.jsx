'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function SummaryPage() {
  const { id } = useParams();
  const [repo, setRepo] = useState(null);
  const [summary, setSummary] = useState(null); // parsed JSON object
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepoAndSummary = async () => {
      try {
        const res = await fetch('/api/Githubpages');
        const data = await res.json();
        const selectedRepo = data.find((r) => r.id.toString() === id);

        if (!selectedRepo) throw new Error('Repo not found');
        setRepo(selectedRepo);

        const prompt = `
You are an expert technical writer. Please analyze the following GitHub repository and return a JSON summary with these fields:

{
  "summary": "A high-level overview of what the repository is about",
  "features": ["List of key features"],
  "tech_stack": ["List of major technologies used"],
  "usage": "How people typically use this project",
  "benefits": "Why this repo is useful or popular"
}

Repository details:
- Name: ${selectedRepo.name}
- Description: ${selectedRepo.description || 'No description'}
- Language: ${selectedRepo.language || 'Unknown'}

Respond with only valid JSON — no commentary, no markdown. And please give longer response
        `;

        const summaryRes = await fetch('/api/summarize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        });

        
        const summaryData = await summaryRes.json();

        try {
          // Remove markdown code fences like ```json ... ```
          const cleaned = summaryData.summary.replace(/```json|```/g, '').trim();
          const parsed = JSON.parse(cleaned);
          setSummary(parsed);
        } catch (e) {
          console.error('Failed to parse summary JSON:', e);
          setSummary(null);
        }
      } catch (err) {
        console.error(err.message);
        setSummary(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoAndSummary();
  }, [id]);

  if (loading) return <div className="p-6">Loading summary...</div>;
  if (!repo) return <div className="p-6">Repository not found.</div>;

  return (
    <div className="p-8 text-black bg-white md:ml-20">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">{repo.name}</h1>
      <p className="text-gray-700 mb-4">{repo.description}</p>
      <p className="text-sm text-gray-500 mb-6">⭐ {repo.stars} | 🧠 {repo.language || 'Unknown'}</p>
      <h2 className="text-xl font-semibold mb-2">🔍 AI Summary</h2>

      {summary ? (
        <div className="bg-gray-100 p-4 rounded-md space-y-3">
          <p><strong>📝 Overview:</strong> {summary.summary}</p>
          <p><strong>⚙️ Features:</strong> {summary.features?.join(', ')}</p>
          <p><strong>🧰 Tech Stack:</strong> {summary.tech_stack?.join(', ')}</p>
          <p><strong>🚀 Usage:</strong> {summary.usage}</p>
          <p><strong>🎯 Benefits:</strong> {summary.benefits}</p>
        </div>
      ) : (
        <p className="text-red-500">⚠️ Summary unavailable.</p>
      )}
    </div>
  );
}
