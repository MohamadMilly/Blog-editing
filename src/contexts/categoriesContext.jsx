import { useContext, createContext, useEffect, useState } from "react";

const CategoriesContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL;

export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/categories`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to get categories");
        }
        setCategories(data.categories || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);
  return (
    <CategoriesContext.Provider
      value={{ isLoading, setCategories, categories, error }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export const useCategories = () => useContext(CategoriesContext);
