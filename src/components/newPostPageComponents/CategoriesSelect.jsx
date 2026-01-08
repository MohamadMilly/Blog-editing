import { useCategories } from "../../contexts/categoriesContext";
import { NewCategoryForm } from "./NewCategoryForm";
import { Shapes } from "lucide-react";
export function CategoriesSelectList({
  selectedCategories,
  setSelectedCategories,
}) {
  const { isLoading, error, categories } = useCategories();

  const toggleCategory = (id, isSelected) => {
    if (isSelected) {
      setSelectedCategories((prev) => prev.filter((c) => c.id !== id));
    } else {
      const selectedCategory = categories.find(
        (category) => category.id === id
      );
      setSelectedCategories((prev) => [...prev, selectedCategory]);
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <section className="mx-auto max-w-120 bg-gray-900/10 p-4 rounded ">
      <h3 className="flex items-center gap-x-2 text-md text-sm mb-4">
        <Shapes size={20} />
        <span>Select post's categories</span>
      </h3>
      <ul className="flex flex-col gap-1">
        {categories.length > 0 ? (
          categories.map((category) => {
            const isSelected = selectedCategories.find(
              (c) => c.id === category.id
            )
              ? true
              : false;
            return (
              <li key={category.id}>
                <button
                  className={`w-full h-full px-4 py-2.5 rounded-full text-sm cursor-pointer ${isSelected ? "bg-white text-pink-600" : "bg-gray-800/10 text-pink-500/40"} transition-all duration-300`}
                  key={category.id}
                  onClick={() => toggleCategory(category.id, isSelected)}
                >
                  {category.title}{" "}
                </button>
              </li>
            );
          })
        ) : (
          <p>No Categories yet.</p>
        )}
      </ul>
      <NewCategoryForm />
    </section>
  );
}
