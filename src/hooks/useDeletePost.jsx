import { useState } from "react";
import { useMyPosts } from "../contexts/myPostsContext";
import { useAuth } from "../contexts/authContext";
import { sortPosts } from "../utlis/sortPosts";

const API_URL = import.meta.env.VITE_API_URL;

export function useDeletePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { setPosts, posts } = useMyPosts();
  const { token } = useAuth();

  const deletePost = async (slug) => {
    const deletedPost = posts.find((post) => post.slug === slug);
    setPosts((prev) => prev.filter((post) => post.slug !== slug));
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/posts/${slug}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to delete post.");
      }
    } catch (err) {
      setPosts((prev) => sortPosts([...prev, deletedPost], "createdAt"));
      setError(err.message);
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, error, deletePost };
}
