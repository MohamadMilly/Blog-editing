import { timeAgo } from "../utlis/dateUtils";

export function PostPreviewCard({
  title,
  content,
  updatedAt = null,
  createdAt,
  featuredImageURL,
}) {
  const createdAtDate = new Date(createdAt);
  const updatedAtDate = new Date(updatedAt);

  const createdAtDateISO = createdAtDate.toISOString();
  const updatedAtDateISO = updatedAtDate.toISOString();

  const updatedAtDateString = timeAgo(updatedAtDate);
  const createdAtDateString = timeAgo(createdAtDate);
  return (
    <article>
      <div>
        {featuredImageURL ? (
          <img
            className="object-cover w-full h-full"
            src={featuredImageURL}
            alt="post feature image"
          />
        ) : (
          <ImageIcon size={32} />
        )}
      </div>
      <aside>
        <h2>{title}</h2>
        <p>
          {content.length > 100
            ? content.slice(0, content.lastIndexOf(" ", 100)) + "..."
            : content}
        </p>
        <div>
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
