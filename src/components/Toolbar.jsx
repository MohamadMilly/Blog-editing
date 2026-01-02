import { useState } from "react";
import { EllipsisVertical, X, SearchCheck, SearchSlash } from "lucide-react";
import { PostsControl } from "./PostsControl";
export function Toolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <aside className="relative hidden sm:block">
      <button
        className="flex items-center justify-center p-1 rounded-full hover:bg-gray-400/10 transition-all duration-300"
        onClick={handleToggleOpen}
      >
        {isOpen ? <X size={20} /> : <EllipsisVertical size={20} />}
      </button>
      {isOpen && (
        <div
          className="absolute top-full w-40 px-2 mt-2 right-0 bg-slate-900/95 backdrop-blur-2xl rounded-md
        "
        >
          <PostsControl />
        </div>
      )}
    </aside>
  );
}
