export function searchPostsByQuery(posts, query) {
  if (!query) return posts;
  const lowerQuery = query.toLowerCase();
  return posts.filter((post) => {
    const postSlug = post.slug.toLowerCase();
    const postTitle = post.title.toLowerCase();
    console.log(postSlug, postTitle);
    if (postSlug.includes(lowerQuery) || postTitle.includes(lowerQuery)) {
      return true;
    } else {
      return false;
    }
  });
}
