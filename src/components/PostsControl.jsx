import { usePublish } from "../hooks/usePublish";
import { SearchCheck, SearchSlash } from "lucide-react";
export function PostsControl() {
  const { isLoading, error, toggleAll } = usePublish();
  const handlePublish = () => {
    toggleAll(true);
  };
  const handleUnPublish = () => {
    toggleAll(false);
  };
  return (
    <div className="mt-2">
      <h2 className="font-medium text-gray-300 mb-2">Posts control</h2>
      <div className="group flex items-center px-4 py-2 bg-gray-500/10 rounded hover:bg-gray-500/20">
        <button
          onClick={handlePublish}
          className="group-hover:underline flex items-center gap-x-2 cursor-pointer"
        >
          <SearchCheck size={18} />
          <span className="text-sm">Publish all</span>
        </button>
      </div>
      <div className="group flex items-center px-4 py-2 bg-gray-500/10 rounded hover:bg-gray-500/20 mt-1">
        <button
          onClick={handleUnPublish}
          className="group-hover:underline flex items-center gap-x-2 cursor-pointer"
        >
          <SearchSlash size={18} />
          <span className="text-sm">Unpublish all</span>
        </button>
      </div>
    </div>
  );
}
