import { firestore } from "../../../../firebase/firebase";
import { collection, setDoc, doc } from "firebase/firestore";

export async function POST(req) {
  try {
    const { data } = await req.json();
    const huggingFaceCollection = collection(firestore, "huggingface_data");

    for (const repo of data) {
      // Sanitize the ID (Replace "/" with "_")
      const sanitizedId = repo.id.replace(/\//g, "_");

      // Ensure all fields exist to avoid Firebase errors
      const repoData = {
        modelId: repo.modelId || "Unknown",
        library_name: repo.library_name || "Unknown",
        pipeline_tag: repo.pipeline_tag || "Unknown",
        likes: repo.likes ?? 0,
        downloads: repo.downloads ?? 0,
        trendingScore: repo.trendingScore ?? 0,
        createdAt: repo.createdAt || new Date().toISOString(),
        private: repo.private ?? false,
        tags: Array.isArray(repo.tags) ? repo.tags : [],
      };

      await setDoc(doc(huggingFaceCollection, sanitizedId), repoData, { merge: true });
    }

    return Response.json({ message: "Hugging Face data saved successfully!" });
  } catch (error) {
    console.error("🔥 Error in addHuggingFaceData API:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
