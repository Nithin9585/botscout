'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Card from "../components/Card"
import img1 from "../../public/loralogo.svg"
import img2 from "../../public/Dalle.svg"
import img3 from "../../public/llama.svg"
import img4 from "../../public/Mistral.svg"
import { useEffect, useState } from "react";
export default function huggingfacepages() {
  const [repo, setRepos] = useState([])

  useEffect(async () => {
    const res = await fetch('/api/Githubpages');
    const data = await res.json();

    setRepos(data);

  }, [])

  const images = [img1,img2,img3,img4]


  return (
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
        {repo.map((rep) => {
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
  );
}
