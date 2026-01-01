import { useContext, createContext, useState, useEffect } from "react";
import { useAuth } from "./authContext";
import { searchPostsByQuery } from "../utlis/searchPosts";

const MyPostsContext = createContext([]);

export function MyPostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [queryPosts, setQueryPosts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/users/me/posts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("An Error happened while fetching posts");
        }
        const fetchedPostsObj = await response.json();
        setPosts(fetchedPostsObj.posts);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getPosts();
  }, [API_URL, token]);

  const searchPosts = (query) => {
    const result = searchPostsByQuery(posts, query);
    setQueryPosts(result);
  };
  return (
    <MyPostsContext.Provider
      value={{
        isLoading,
        error,
        visiblePosts: isSearching ? queryPosts : posts,
        searchPosts,
        setIsSearching,
        setPosts,
      }}
    >
      {children}
    </MyPostsContext.Provider>
  );
}

export const useMyPosts = () => useContext(MyPostsContext);
