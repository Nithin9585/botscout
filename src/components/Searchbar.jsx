import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({repoData, setReposData, setRepos, repo}) {
  const [query, setQuery] = useState("");
  
  useEffect(() => {
    if (query === '') {
        setRepos(repo)
        return;
      }
    const filtered = repo.filter((rep) =>
      rep.name.toLowerCase().includes(query.toLowerCase())
    );
    setReposData(filtered);
  }, [query]);
  return (
    <div className="flex items-center w-full max-w-xl bg-[#2e2b3f] text-white rounded-full px-4 py-2 smt-20 hadow-md focus-within:ring-2 focus-within:ring-purple-500 transition mx-auto mt-20">
      <input
        type="text"
        className="flex-grow bg-transparent text-white placeholder-purple-200 outline-none"
        placeholder="Search from Github/ARXIV/Hugging face"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Search className="text-purple-200" size={20} />
    </div>
  );
}
