export const sortPosts = (posts, key) => {
  if (!posts) {
    return;
  }
  if (!key) {
    throw new Error("Missing key.");
  }
  if (!Array.isArray(posts)) {
    throw new Error("Invalid input");
  }
  const sortedPosts = posts.sort((a, b) => new Date(b[key]) - new Date(a[key]));
  return sortedPosts;
};
