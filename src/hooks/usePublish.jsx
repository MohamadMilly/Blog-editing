import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useMyPosts } from "../contexts/myPostsContext";

const API_URL = import.meta.env.VITE_API_URL;

export function usePublish() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const { setPosts } = useMyPosts();
  const toggleAll = async (status) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/posts`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publish: status,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result.message || `Failed to ${status ? "publish" : "unpublish"}.`
        );
      }
      // sadly i couldn't sort this in backend by orderBy
      const sortedPosts = result.posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sortedPosts);
    } catch (err) {
      setError(err.message);
      console.error(err.message);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, error, toggleAll };
}
