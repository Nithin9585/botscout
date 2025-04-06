'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
export default function SummaryPage() {
  const { id } = useParams();
  const [repo, setRepo] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepoAndSummary = async () => {
      try {
        // Get all repos from API
        const res = await fetch('/api/Githubpages');
        const data = await res.json();
        const selectedRepo = data.find((r) => r.id.toString() === id);

        if (!selectedRepo) {
          throw new Error('Repo not found');
        }

        setRepo(selectedRepo);

        // Prepare prompt for DeepSeek
        const prompt = `Give a short summary for this GitHub repository:\nName: ${selectedRepo.name}\nDescription: ${selectedRepo.description || 'No description'}\nLanguage: ${selectedRepo.language} dont add formatting`;

        // Call your custom /api/summarize route
        const summaryRes = await fetch('/api/summarize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        });

        const summaryData = await summaryRes.json();
        setSummary(summaryData.summary);
      } catch (err) {
        setSummary('Error fetching summary.');
        console.error(err.message);
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
      <p className="bg-gray-100 p-4 rounded-md">{summary}</p>
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