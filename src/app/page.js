'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Card from "../components/Card"
import img1 from "../../public/loralogo.svg"
import img2 from "../../public/Dalle.svg"
import img3 from "../../public/llama.svg"
import img4 from "../../public/Mistral.svg"
import { useEffect, useState } from "react";
import Subscribers from "@/components/Subsribebtn";
import SearchBar from "@/components/Searchbar";
import Navbar from "@/components/Navbar";
export default function Huggingfacepages() {
  const [repo, setRepos] = useState([]);
  const [repoData, setReposData] = useState([]);
  const images = [img1,img2,img3,img4]
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/Githubpages');
        const data = await res.json();
  
        setRepos(data);
        setReposData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub pages data:", error);
        setLoading(false); // It's important to set loading to false even on error
        // Optionally, set an error state here
      }
    }
  
    fetchData(); // Call the async function immediately
  }, []);



  return (
    <div>  
<div className="flex justify-between mt-20 ml-24">
<div><Navbar/></div>
     <div className="mr-20">
        <Subscribers />
        </div>
      
      </div>     

      <SearchBar repoData={repoData} setReposData={setReposData} setRepos = {setRepos} repo={repo}/>
      {loading && (
      <div className="flex justify-center items-center min-h-[200px]">
      <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-white border-t-transparent"></div>
    </div>
    )}
    <div className=" w-50 h-50 text-black">
      {/* <Link href="/Arxivpages">
        <Button className="m-4 cursor-pointer">
          Arxiv Pages
        </Button>
      </Link>    
      <Link href="/huggingfacepages">
      <Button className="m-4 cursor-pointer">
      hugging facepages
        </Button>
     </Link>
     <Link href="/githubpages">
        <Button className="m-4 cursor-pointer">
          github pages
        </Button>
      </Link> */}

      {/* git cards */}
      <main className="flex justify-around w-[90vw] flex-wrap gap-7 md:ml-20">
        {repoData.map((rep) => {
          const random = Math.floor(Math.random() * 4);
          return (

            <Card
            key={rep.id}
              title={rep.name}
              imageUrl={images[random]}
              learnMoreUrl="/githubpages"
              githubUrl={rep.url}
            />
          )
        })}

      </main>
 </div>
    </div>
  );
}
