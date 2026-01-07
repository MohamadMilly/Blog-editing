import { useState } from "react";
import { useMyPosts } from "../contexts/myPostsContext";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

export function useUpSertPost() {
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const { setPosts } = useMyPosts();
  const { token } = useAuth();
  const navigate = useNavigate();
  const addPost = async (
    published,
    { title, slug, categories, content, featuredImageURL }
  ) => {
    try {
      setAddLoading(true);
      setAddError(null);
      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
          published: published,
          slug: slug,
          categories: categories?.map((category) => category.title) || [],
          featuredImageURL: featuredImageURL || null,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to post.");
      }
      setPosts((prev) => [result.post, ...prev]);
      navigate("/dashboard");
    } catch (err) {
      setAddError(err.message);
      console.error(err.message);
    } finally {
      setAddLoading(false);
    }
  };
  const updatePost = async (
    id,
    prevSlug,
    published,
    { title, slug, categories, content, featuredImageURL }
  ) => {
    try {
      setUpdateLoading(true);
      setUpdateError(null);
      const response = await fetch(`${API_URL}/posts/${prevSlug}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug,
          categories: categories.map((category) => category.title),
          content,
          featuredImageURL: featuredImageURL || null,
          published: published,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed Updating the comment");
      }
      const updatedPost = result.post;
      setPosts((prev) =>
        prev.map((post) => {
          if (post.id === id) {
            return updatedPost;
          } else {
            return post;
          }
        })
      );
      navigate("/dashboard");
    } catch (err) {
      setUpdateError(err.message);
      console.error(err.message);
    } finally {
      setUpdateLoading(false);
    }
  };
  return {
    addLoading,
    addError,
    updateLoading,
    updateError,
    addPost,
    updatePost,
  };
}
