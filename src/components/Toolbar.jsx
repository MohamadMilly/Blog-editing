import { useState } from "react";
import { EllipsisVertical, X } from "lucide-react";
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
          className="absolute top-full w-37.5 mt-2 right-0 bg-slate-900/95 backdrop-blur-2xl px-4 py-2 rounded-md
        "
        >
          <button className="text-sm cursor-pointer px-2 py-0.5 hover:bg-gray-600/40 rounded transition-all duration-300 w-full mb-0.5">
            Publish all
          </button>
          <button className="text-sm cursor-pointer px-2 py-0.5 hover:bg-gray-600/40 rounded w-full mt-0.5">
            Unpublish all
          </button>
        </div>
      )}
    </aside>
  );
}
