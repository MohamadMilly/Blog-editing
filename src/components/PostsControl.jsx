import { usePublish } from "../hooks/usePublish";
import { SearchCheck, SearchSlash } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
import Spinner from "./Spinner";
export function PostsControl() {
  const { status, toggleAll } = usePublish();
  const isLoading = status === "publishing" || status === "unpublishing";
  const handlePublish = () => {
    toggleAll(true);
  };
  const handleUnPublish = () => {
    toggleAll(false);
  };
  return (
    <div className="mt-2">
      <h2 className="font-medium text-gray-300 mb-2 flex items-center gap-x-2">
        <SlidersHorizontal size={18} />
        <span>Posts control</span>
      </h2>
      <div className="group flex items-center px-4 py-2 bg-gray-500/10 rounded hover:bg-gray-500/20">
        <button
          onClick={handlePublish}
          disabled={isLoading}
          className="group-hover:underline flex items-center gap-x-2 cursor-pointer disabled:animate-pulse"
        >
          <SearchCheck size={18} />
          <span className="text-sm">Publish all</span>
          {status === "publishing" && (
            <Spinner size="sm" color="gray-500" className="ml-2" />
          )}
        </button>
      </div>
      <div className="group flex items-center px-4 py-2 bg-gray-500/10 rounded hover:bg-gray-500/20 mt-1">
        <button
          disabled={isLoading}
          onClick={handleUnPublish}
          className="group-hover:underline flex items-center gap-x-2 cursor-pointer disabled:animate-pulse"
        >
          <SearchSlash size={18} />
          <span className="text-sm">Unpublish all</span>
          {status === "unpublishing" && (
            <Spinner size="sm" color="gray-500" className="ml-2" />
          )}
        </button>
      </div>
    </div>
  );
}
