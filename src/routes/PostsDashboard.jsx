import { useMyPosts } from "../contexts/myPostsContext";
import { PostPreviewCard } from "../components/PostPreviewCard";
import { SearchBar } from "../components/SearchBar";
export function PostsDashboard() {
  const { isLoading, error, visiblePosts } = useMyPosts();
  if (error) return <p>Error: {error}</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <main className="w-full px-4 sm:px-12 py-4 my-6 max-w-190 mx-auto text-gray-200 transition-all duration-300">
      <SearchBar />
      <section className="flex flex-col gap-2">
        {visiblePosts && visiblePosts.length !== 0 ? (
          visiblePosts.map((post) => {
            return (
              <PostPreviewCard
                key={post.id}
                title={post.title}
                createdAt={post.createdAt}
                updatedAt={post.updatedAt}
                featuredImageURL={post.featuredImageURL}
                published={post.published}
                slug={post.slug}
              />
            );
          })
        ) : (
          <p className="text-center text-sm mask-t-from-1.5">No posts.</p>
        )}
      </section>
    </main>
  );
}
