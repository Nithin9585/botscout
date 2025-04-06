import { parseStringPromise } from 'xml2js'; // Import xml2js parser using promises
import { NextResponse } from 'next/server'; // Use NextResponse for Next.js compatibility

export async function GET() {
  const apiUrl = 'https://export.arxiv.org/api/query?search_query=all:AI&start=0&max_results=10'; // Example query for AI papers

  try {
    const response = await fetch(apiUrl);
    const xmlData = await response.text(); // Get the XML data as text

    // Use parseStringPromise to return a promise for XML parsing
    const result = await parseStringPromise(xmlData, { explicitArray: false });

    // Extract relevant fields from the parsed data
    const entries = result.feed.entry ? result.feed.entry : [];

    // Return the parsed data as JSON
    return NextResponse.json(entries);
  } catch (error) {
    // Return an error response if fetching or parsing fails
    return NextResponse.json({ error: 'Error fetching or parsing data from Arxiv' }, { status: 500 });
  }
}
