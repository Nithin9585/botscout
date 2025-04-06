import { parseStringPromise } from 'xml2js'; // Import xml2js parser using promises
import { NextResponse } from 'next/server'; // Use NextResponse for Next.js compatibility

export async function GET() {
  const apiUrl = 'https://export.arxiv.org/api/query?search_query=all:AI&start=0&max_results=10'; // Example query for AI papers

  try {
    const response = await fetch(apiUrl);
    const xmlData = await response.text(); 
    const result = await parseStringPromise(xmlData, { explicitArray: false });

    const entries = result.feed.entry ? result.feed.entry : [];

    return NextResponse.json(entries);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching or parsing data from Arxiv' }, { status: 500 });
  }
}
