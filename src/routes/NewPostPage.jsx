import { useState } from "react";
import PostTextAreaEditor from "../components/newPostPageComponents/PostTextAreaEditor";
import { CategoriesSelectList } from "../components/newPostPageComponents/CategoriesSelect";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router";
import { useMyPosts } from "../contexts/myPostsContext";
import { FeaturedImageField } from "../components/newPostPageComponents/FeaturedImageField";

const API_URL = import.meta.env.VITE_API_URL;

export function NewPostPage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [manualSlug, setManualSlug] = useState("");
  const [hasSetTheSlugManually, setHasSetTheSlugManually] = useState(false);
  const [categories, setCategories] = useState([]);
  const [featuredImageURL, setFeaturedImageURL] = useState(null);
  const { setPosts } = useMyPosts();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuth();

  const handlePost = async (published) => {
    try {
      setIsLoading(true);
      setError(null);
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
      setError(err.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const goNext = () => {
    if (step >= 2) return;
    setStep(step + 1);
  };
  const goBack = () => {
    if (step <= 1) return;
    setStep(step - 1);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const slug =
    manualSlug || hasSetTheSlugManually
      ? manualSlug
      : title
          .toLowerCase()
          .replaceAll(/\s+/g, "-")
          .replaceAll(/[^a-z0-9\-]/g, "");
  return (
    <main className="w-full px-4 sm:px-12 py-4 my-6 max-w-250 mx-auto text-gray-200 transition-all duration-300">
      {step === 1 && (
        <FeaturedImageField
          featuredImageURL={featuredImageURL}
          setFeaturedImageURL={setFeaturedImageURL}
        />
      )}
      <form onSubmit={(e) => e.preventDefault()} action="post">
        {step === 1 && (
          <section>
            <div className="flex flex-col mx-auto gap-2 max-w-120 mb-4">
              <label className="text-lg text-gray-200" htmlFor="title">
                Title
              </label>
              <input
                className="px-4 py-2 bg-gray-800/60 rounded-full outline-2 outline-white/50 focus:outline-pink-700 transition-all duration-300"
                id="title"
                type="text"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="flex flex-col mx-auto gap-2 max-w-120 mb-4">
              <label
                className="
            text-lg text-gray-200"
                htmlFor="slug
        "
              >
                Slug <span className="text-sm">(used in the url)</span>
              </label>
              <input
                className="px-4 py-2 bg-gray-800/60 rounded-full outline-2 outline-white/50 focus:outline-pink-700 transition-all duration-300"
                id="slug"
                type="text"
                value={slug}
                onChange={(e) => {
                  setManualSlug(e.target.value);
                  setHasSetTheSlugManually(true);
                }}
              />
            </div>
            <CategoriesSelectList
              selectedCategories={categories}
              setSelectedCategories={setCategories}
            />
          </section>
        )}
        {step === 2 && (
          <section>
            <PostTextAreaEditor onWrite={setContent} content={content} />
            <div className="flex justify-center items-center gap-x-2 flex-wrap my-4">
              <button
                className="px-4 py-2 text-sm bg-white text-pink-700 rounded cursor-pointer hover:bg-gray-200"
                disabled={isLoading}
                onClick={() => handlePost(true)}
              >
                Post and published
              </button>
              <button
                className="px-4 py-2 text-sm bg-pink-700 text-white cursor-pointer rounded hover:bg-pink-600"
                disabled={isLoading}
                onClick={() => handlePost(false)}
              >
                Keep in draft
              </button>
            </div>
          </section>
        )}
      </form>

      <div className="mt-6 flex justify-center">
        <button
          className="grow bg-gray-500/10 rounded-l-full hover:bg-gray-500/20 max-w-50 p-6 flex justify-center items-center text-sm text-pink-600 fonr-medium"
          onClick={goBack}
        >
          Previous
        </button>
        <button
          className="grow bg-pink-600 hover:bg-pink-500 rounded-r-full p-6 flex justify-center max-w-50 items-center text-sm text-white fonr-medium"
          onClick={goNext}
        >
          Next
        </button>
      </div>
    </main>
  );
}
