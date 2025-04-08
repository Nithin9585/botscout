import { firestore } from "../../../../firebase/firebase";
import { collection, setDoc, doc } from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();
    const { data } = body;

    if (!data || !Array.isArray(data)) {
      return new Response(JSON.stringify({ error: "Invalid data format" }), { status: 400 });
    }

    const githubCollection = collection(firestore, "github_data");

    for (const repo of data) {
      await setDoc(doc(githubCollection, repo.id.toString()), {
        name: repo.name ?? "Unknown",  // Default name if missing
        description: repo.description ?? "No description available",
        url: repo.url ?? "",
        stars: repo.stars ?? 0,  // Default 0 if missing
        forks: repo.forks ?? 0,  // Default 0 if missing
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    }

    return new Response(JSON.stringify({ message: "GitHub data updated successfully" }), { status: 200 });
  } catch (error) {
    console.error("🔥 Error in addGithubData API:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
