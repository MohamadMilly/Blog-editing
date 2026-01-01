import { useCategories } from "../../contexts/categoriesContext";
import { useState } from "react";
export function NewCategoryForm() {
  const [category, setCategory] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const { setCategories } = useCategories();
  const [isSlideUpRunning, setIsSlideUpRunning] = useState(false);
  const handleAddCategory = () => {
    const categoryObj = {
      id: crypto.randomUUID(),
      title: category,
    };
    setCategories((prev) => [...prev, categoryObj]);
  };

  return (
    <div>
      <button
        className="mt-4 mb-2 px-4 py-2 text-sm bg-pink-600/10 hover:bg-pink-600/20 text-pink-800 rounded cursor-pointer"
        onClick={() => setIsAdding(true)}
      >
        Add
      </button>
      {isAdding && (
        <div
          className={
            isSlideUpRunning
              ? "animate-slideup ease-out"
              : "animate-dropdown ease-in"
          }
        >
          <input
            className="text-sm w-full rounded-full px-4 py-2 outline-2 outline-gray-200/20 bg-pink-500/5 focus:outline-gray-200/30 transition-all duration-300 hover:bg-pink-600/6"
            aria-label="new category"
            onChange={(e) => setCategory(e.target.value)}
            type="text"
          />
          <div className="flex gap-x-2 mt-2 items-center">
            <button
              className="bg-pink-700/70 w-16 h-8 text-sm rounded hover:bg-pink-600/70 cursor-pointer transition-all duration-300"
              onClick={handleAddCategory}
            >
              Add
            </button>
            <button
              className="border-2 border-pink-700/70 w-16 h-8 text-sm rounded hover:bg-pink-600/70 cursor-pointer transition-all duration-300"
              onClick={() => {
                setIsSlideUpRunning(true);
                setTimeout(() => {
                  setIsAdding(false);
                  setIsSlideUpRunning(false);
                }, 300);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
