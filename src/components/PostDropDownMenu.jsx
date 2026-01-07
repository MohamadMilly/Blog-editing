import { useState } from "react";
import { Ellipsis, X } from "lucide-react";
import { EventButton } from "./EventButton";
import { Pen } from "lucide-react";
import { DeletePostButton } from "./DeletePostButton";
import { Link } from "react-router";
export function PostDropDownMenu({ slug, className }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`relative ${className}`}>
      <EventButton
        className={
          "p-1 rounded-full bg-gray-800/10 hover:bg-gray-600/10 transition-all duration-300"
        }
        event={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Ellipsis size={20} />}
      </EventButton>
      {isOpen && (
        <div className=" gap-1 absolute right-full top-0 mr-1 w-40 px-2 py-1 bg-slate-800 rounded text-gray-200">
          <Link
            to={`/dashboard/posts/${slug}/edit`}
            className="flex items-center gap-x-2 text-sm w-full text-start p-1 rounded-t hover:bg-slate-600/10 border-pink-700/50 border-b"
          >
            <Pen size={15} />
            <span>Edit</span>
          </Link>
          <DeletePostButton slug={slug} />
        </div>
      )}
    </div>
  );
}
