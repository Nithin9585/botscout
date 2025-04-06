import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { repo_url } = await req.json();

    if (!repo_url) {
      return new Response(JSON.stringify({ error: "Repository URL is required" }), { status: 400 });
    }

    const prompt = `Generate a Mermaid.js diagram representing the structure of this GitHub repository:\n\n${repo_url}`;

    const aiResponse = await genAI.generateText({
      model: "gemini",
      prompt: prompt,
    });

    return new Response(JSON.stringify({ mermaid_code: aiResponse.text.trim() }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to process the repository" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
