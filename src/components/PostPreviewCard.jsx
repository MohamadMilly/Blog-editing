import { timeAgo } from "../utlis/dateUtils";
import { ArrowUpRight, ImageIcon } from "lucide-react";
import { PostDropDownMenu } from "./PostDropDownMenu";
export function PostPreviewCard({
  title,
  updatedAt = null,
  createdAt,
  featuredImageURL,
  published,
  slug,
}) {
  const createdAtDate = new Date(createdAt);
  const updatedAtDate = new Date(updatedAt);

  const createdAtDateISO = createdAtDate.toISOString();
  const updatedAtDateISO = updatedAtDate.toISOString();

  const updatedAtDateString = timeAgo(updatedAtDate);
  const createdAtDateString = timeAgo(createdAtDate);
  return (
    <article className="relative flex flex-wrap rounded-2xl min-37.5 overflow-hidden bg-slate-900/70 backdrop-blur-2xl">
      <div className="w-full h-60 sm:w-37.5 sm:h-37.5 shrink-0 flex justify-center items-center bg-gray-800/10">
        {featuredImageURL ? (
          <img
            className="object-cover w-full h-full"
            src={featuredImageURL}
            alt="post feature image"
          />
        ) : (
          <ImageIcon className="" size={32} />
        )}
      </div>
      <aside className="grow px-4 py-3 basis-xs relative">
        <div className="absolute top-2 right-4 flex items-center gap-x-2">
          <PostDropDownMenu />
          {published && (
            <a
              className=" hover:translate-x-1 hover:-translate-y-1 transition-all duration-300"
              href={`https://blog-consumption.vercel.app/posts/${slug}`}
            >
              <ArrowUpRight size={24} />
            </a>
          )}
        </div>

        <h2 className="text-lg font-medium mb-1">{title}</h2>
        <div>
          <span
            className={
              published
                ? "text-xs px-1 py-0.5 text-green-400 bg-green-600/30 rounded"
                : "text-xs px-1 py-0.5  p-0.5 text-red-400 bg-red-600/30 rounded"
            }
          >
            {published ? "Published" : "Unpublished"}
          </span>
        </div>
        <div className="text-sm mt-2 flex items-center gap-x-6 text-gray-400 flex-wrap">
          <time dateTime={createdAtDateISO}>
            Created: {createdAtDateString}
          </time>
          {updatedAt && (
            <time dateTime={updatedAtDateISO}>
              Updated: {updatedAtDateString}
            </time>
          )}
        </div>
      </aside>
    </article>
  );
}
