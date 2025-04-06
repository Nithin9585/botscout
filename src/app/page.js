import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="ml-100 w-50 h-50 text-black   m-25">
      <Link href="/Arxivpages">
        <Button className="m-4 cursor-pointer">
          Arxiv Pages
        </Button>
      </Link>    
 </div>
  );
}
