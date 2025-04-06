import { NextResponse } from 'next/server';

export async function GET() {
  const GITHUB_API = 'https://api.github.com/search/repositories?q=stars:%3E10000&sort=stars';

  try {
    const response = await fetch(GITHUB_API);

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    const data = await response.json();

    const simplified = data.items.map((repo) => ({
      id: repo.id,
      name: repo.full_name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language,
      readme_url: `${repo.url}/readme`,
    }));

    return NextResponse.json(simplified);
  } catch (error) {
    console.error('GitHub fetch error:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch data from GitHub' },
      { status: 500 }
    );
  }
}
