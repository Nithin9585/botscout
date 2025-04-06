import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch('https://huggingface.co/api/models', {
      method: 'GET',
      
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Hugging Face models');
    }
    
    const data = await response.json();
    return NextResponse.json(data.slice(0, 10)); // Return top 10 models

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
