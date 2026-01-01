import { useMyPosts } from "../contexts/myPostsContext";
import { Search } from "lucide-react";
export function SearchBar() {
  const { searchPosts, setIsSearching } = useMyPosts();
  const handleQueryChange = (e) => {
    const query = e.target.value;
    if (!query) {
      return setIsSearching(false);
    }
    setIsSearching(true);
    searchPosts(query);
  };
  return (
    <form onSubmit={(e) => e.preventDefault()} className="mb-8" method="get">
      <div className="bg-gray-800/60 outline-2 outline-white rounded-full flex items-center px-4 has-focus:outline-pink-700 transition-all duration-300">
        <input
          className="w-full px-4 py-2 outline-none"
          type="search"
          name="query"
          placeholder="Search..."
          onChange={handleQueryChange}
          aria-label="Search my posts input"
        />
        <Search />
      </div>
    </form>
  );
}
