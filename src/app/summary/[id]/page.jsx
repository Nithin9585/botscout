'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SummaryPage() {
  const { id } = useParams();
  const [repo, setRepo] = useState(null);
  const [summary, setSummary] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepoAndSummary = async () => {
      try {
        // Fetch repositories from API
        const res = await fetch('/api/Githubpages');
        const data = await res.json();
        const selectedRepo = data.find((r) => r.id.toString() === id);

        if (!selectedRepo) throw new Error('Repo not found');
        setRepo(selectedRepo);

        // AI prompt for repository summary
        const prompt = `
You are an expert technical writer. Analyze the following GitHub repository and return a JSON summary:

{
  "summary": "A high-level overview of the repository",
  "features": ["Key features"],
  "tech_stack": ["Major technologies used"],
  "usage": "Typical use case",
  "benefits": "Why this repository is useful"
}

Repository details:
- Name: ${selectedRepo.name}
- Description: ${selectedRepo.description || 'No description'}
- Language: ${selectedRepo.language || 'Unknown'}

Respond with only valid JSON.
        `;

        const summaryRes = await fetch('/api/summarize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        });

        const summaryData = await summaryRes.json();

        try {
          const parsed = JSON.parse(summaryData.summary);
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
      
      {/* AI Summary */}
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

      {/* GitDiagram Button */}
      <Link href={`https://gitdiagram.com/${repo.name}`} target="_blank" rel="noopener noreferrer">
        <Button className="mt-4">Get Flow Diagram</Button>
      </Link>

      {/* Embed GitDiagram in an iframe */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">📌 Repository Flow Diagram</h2>
        <iframe
          src={`https://gitdiagram.com/${repo.name}`}
          width="100%"
          height="500px"
          className="border rounded-md"
        ></iframe>
      </div>
    </div>
  );
}
