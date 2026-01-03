import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useMyPosts } from "../contexts/myPostsContext";
import { sortPosts } from "../utlis/sortPosts";

const API_URL = import.meta.env.VITE_API_URL;

export function usePublish() {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(false);
  const { token } = useAuth();
  const { setPosts } = useMyPosts();
  const toggleAll = async (publish) => {
    try {
      setStatus(publish ? "publishing" : "unpublishing");
      setError(null);
      const response = await fetch(`${API_URL}/posts`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publish: publish,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result.message || `Failed to ${publish ? "publish" : "unpublish"}.`
        );
      }
      // sadly i couldn't sort this in backend by orderBy
      const sortedPosts = sortPosts(result.posts, "createdAt");
      setPosts(sortedPosts);
    } catch (err) {
      setError(err.message);
      console.error(err.message);
      alert(err.message);
    } finally {
      setStatus(null);
    }
  };
  return { status, error, toggleAll };
}
