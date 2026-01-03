import { useDeletePost } from "../hooks/useDeletePost";
import { EventButton } from "./EventButton";
import Spinner from "./Spinner";
import { Trash } from "lucide-react";
export function DeletePostButton({ slug }) {
  const { deletePost, isLoading, error } = useDeletePost();
  return (
    <EventButton
      className={
        "flex items-center gap-x-2 cursor-pointer text-sm w-full text-start p-1 rounded-b hover:bg-slate-600/10"
      }
      event={() => deletePost(slug)}
    >
      <Trash size={15} />
      <span>Delete</span>
      {isLoading && <Spinner size="sm" />}
    </EventButton>
  );
}
