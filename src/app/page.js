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
    async function fetchData(category) {
      setLoading(true);
      try {
        let endpoint = "/api/Githubpages"; 
        if (category === "huggingface") endpoint = "/api/huggingface";
        if (category === "arxiv") endpoint = "/api/Arxivpages";

        const res = await fetch(endpoint);
        const data = await res.json();

        setRepos(data);
        console.log(data)
        setReposData(data);
      } catch (error) {
        console.error(`Error fetching ${category} data:`, error);
      } finally {
        setLoading(false);
      }
    }

    fetchData(selectedCategory);
  }, [selectedCategory]); 

  return (
    <div className="px-4 md:px-10 lg:px-24">
      <div className="flex flex-col md:flex-row justify-between items-center mt-10 md:mt-20">
        <Navbar />
        <Subscribers />
      </div>

      <SearchBar repoData={repoData} setReposData={setReposData} setRepos={setRepos} repo={repo} />

      {loading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-white border-t-transparent"></div>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-4 my-6">
        <Button
          className={`p-2 rounded-md transition duration-300 ${
            selectedCategory === "github"
              ? "bg-purple-500 border-2 border-white text-white"
              : "bg-purple-400 text-white hover:bg-purple-500"
          }`}
          onClick={() => setSelectedCategory("github")}
        >
          GitHub Models
        </Button>

        <Button
          className={`p-2 rounded-md transition duration-300 ${
            selectedCategory === "huggingface"
              ? "bg-purple-500 border-2 border-white text-white"
              : "bg-purple-400 text-white hover:bg-purple-500"
          }`}
          onClick={() => setSelectedCategory("huggingface")}
        >
          Hugging Face Models
        </Button>

        <Button
          className={`p-2 rounded-md transition duration-300 ${
            selectedCategory === "arxiv"
              ? "bg-purple-500 border-2 border-white text-white"
              : "bg-purple-400 text-white hover:bg-purple-500"
          }`}
          onClick={() => setSelectedCategory("arxiv")}
        >
          ArXiv Models
        </Button>
      </div>

      <main className="flex flex-wrap justify-center gap-6">
  {repoData.map((rep) => {
    const random = Math.floor(Math.random() * images.length);
    return (
      <Card
        key={rep.id}
        title={rep.name || rep.title || rep.modelId || rep.id} // Ensure Hugging Face models display correctly
        imageUrl={images[random]}
        learnMoreUrl={rep.url || rep.id} // Use correct links
        githubUrl={rep.url || rep.id}
      />
    );
  })}
</main>


    </div>
  );
}
