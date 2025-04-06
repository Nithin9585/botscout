import { NextResponse } from 'next/server';

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const completion = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000', // or your deployed site
        'X-Title': 'GitHub Summarizer',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat',
        messages: [
          { role: 'user', content: prompt },
        ],
      }),
    });

    const data = await completion.json();
    const summary = data.choices?.[0]?.message?.content || 'No summary available';

    return NextResponse.json({ summary });
  } catch (err) {
    console.error('Summary error:', err);
    return NextResponse.json({ summary: 'Failed to fetch summary.' }, { status: 500 });
  }
}