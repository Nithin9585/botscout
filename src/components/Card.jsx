"use client";

import Image from "next/image";
import { Github } from "lucide-react";

export default function LoraCard({
  title = "Low-Rank Adaptation for fine-tuning LLMs",
  imageUrl,
  learnMoreUrl = "#",
  githubUrl = "#",

}) {
  return (
    <div className="bg-[#2e2b3f] text-white rounded-2xl p-6 w-72 shadow-xl relative text-center mt-20">
      
      {/* Avatar */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
        <Image
          src={imageUrl}
          alt="Project Logo"
          width={80}
          height={100}
          className="rounded-full shadow-lg"
        />
      </div>

      {/* Title */}
      <div className="mt-14">
        <h2 className="text-lg font-semibold leading-tight">
          {title}
        </h2>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-2">
        <a
          href={learnMoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded-lg text-center"
        >
          Learn More →
        </a>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-purple-500 hover:bg-purple-600 text-white text-sm py-2 rounded-lg flex items-center justify-center gap-1"
        >
          GitHub <Github size={16} />
        </a>
      </div>
    </div>
  );
}
