import { useState } from "react";
import { EllipsisVertical, X } from "lucide-react";
import { PostsControl } from "./PostsControl";
import { LogoutButton } from "./LogoutButton";
import { SettingsSection } from "./Settings";
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
          className="absolute top-full w-50 px-2 py-2 mt-2 right-0 bg-slate-800 backdrop-blur-2xl rounded-md
        "
        >
          <PostsControl />
          <SettingsSection />
        </div>
      )}
    </aside>
  );
}
