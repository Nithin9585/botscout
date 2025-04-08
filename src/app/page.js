"use client";

import { Button } from "@/components/ui/button";
import Card from "../components/Card";
import img1 from "../../public/loralogo.svg";
import img2 from "../../public/Dalle.svg";
import img3 from "../../public/llama.svg";
import img4 from "../../public/Mistral.svg";
import { useEffect, useState } from "react";
import Subscribers from "@/components/Subsribebtn";
import SearchBar from "@/components/Searchbar";
import Navbar from "@/components/Navbar";

export default function Huggingfacepages() {
  const [repo, setRepos] = useState([]);
  const [repoData, setReposData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("github");
  const [loading, setLoading] = useState(true);

  const images = [img1, img2, img3, img4];
  
   


  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchStoredData() {
      setLoading(true);
      try {
        const res = await fetch("/api/GetAllData", { signal });
        if (!res.ok) throw new Error("Failed to fetch stored data");

        const { githubData, huggingfaceData, arxivData } = await res.json();
        let newData = [];

        if (selectedCategory === "github") newData = githubData;
        else if (selectedCategory === "huggingface") newData = huggingfaceData;
        else newData = arxivData;

        if (newData.length > 0) {
          setRepos(newData);
          setReposData(newData);
          console.log("Using stored data:", newData);
        } else {
          console.log(`No stored data for ${selectedCategory}, fetching fresh data...`);
          fetchAndStoreData(selectedCategory);
        }
      } catch (error) {
        console.error("Error fetching stored data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStoredData();

    return () => {
      controller.abort();
    };
  }, [selectedCategory]);

  async function fetchAndStoreData(category) {
    try {
      let endpoint = "/api/Githubpages";
      let apiRoute = "/api/addGithubData";

      if (category === "huggingface") {
        endpoint = "/api/huggingface";
        apiRoute = "/api/addHuggingFaceData";
      }
      if (category === "arxiv") {
        endpoint = "/api/Arxivpages";
        apiRoute = "/api/addArxivData";
      }

      const res = await fetch(endpoint);
      if (!res.ok) throw new Error(`Failed to fetch ${category} data`);

      const data = await res.json();
      console.log(`Fetched new ${category} data:`, data);

      await fetch(apiRoute, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });

      console.log(`Updated ${category} data in Firestore`);
      localStorage.setItem(`${category}_lastFetchTime`, Date.now());

      setRepos(data);
      setReposData(data);
    } catch (error) {
      console.error(`Error fetching ${category} data:`, error);
    }
  }

  

  

  return (
    <div className="px-4 md:px-10 lg:px-24">
<div className="flex   md:flex-row justify-between items-center mt-10 md:mt-20">
 
</div>



      <SearchBar repoData={repoData} setReposData={setReposData} setRepos={setRepos} repo={repo} />

      {loading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-white border-t-transparent"></div>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-4 my-6">
        {["github", "huggingface", "arxiv"].map((category) => (
          <Button
            key={category}
            className={`p-2 rounded-md transition duration-300 ${
              selectedCategory === category
                ? "bg-purple-500 border-2 border-white text-white"
                : "bg-purple-400 text-white hover:bg-purple-500"
            }`}
            onClick={() => {
              setSelectedCategory(category);
            }}
          >
            {category === "github" ? "GitHub Models" : category === "huggingface" ? "Hugging Face Models" : "ArXiv Models"}
          </Button>
        ))}
      </div>

      <main className="flex flex-wrap justify-center gap-6">
  {repoData.map((rep, index) => {
    const image = images[index % images.length];

    let repoId = rep.name || rep.title || rep.modelId || `Unknown-${index}`;
    let repoUrl =
      rep.url || rep.link || (selectedCategory === "huggingface" ? `https://huggingface.co/${rep.modelId}` : "#") || selectedCategory === "arxiv" ? `https://arxiv.org/abs/${rep.id}` : "#";

    return (
      <Card
        key={`${selectedCategory}-${repoId}`}
        title={repoId}
        imageUrl={image}
        learnMoreUrl={`/githubpages`}
        githubUrl={repoUrl}
      />
    );
  })}
</main>

    </div>
  );
}
