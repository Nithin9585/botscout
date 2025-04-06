import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function huggingfacepages() {
  return (
    <div className="ml-100 w-50 h-50 text-black    m-25">
      <Link href="/Arxivpages">
        <Button className="m-4 cursor-pointer">
          Arxiv Pages
        </Button>
      </Link>    
      <Link href="/huggingfacepages">
      <Button className="m-4 cursor-pointer">
      hugging facepages
        </Button>
     </Link>
 </div>
  );
}
