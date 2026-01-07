import { useState } from "react";
import PostTextAreaEditor from "../components/newPostPageComponents/PostTextAreaEditor";
import { CategoriesSelectList } from "../components/newPostPageComponents/CategoriesSelect";
import { FeaturedImageField } from "../components/newPostPageComponents/FeaturedImageField";
import { useUpSertPost } from "../hooks/useUpsertPost";
import { useLoaderData } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

export async function loader({ params }) {
  const { slug } = params;
  if (!slug) return {};
  try {
    const response = await fetch(`${API_URL}/posts/${slug}`);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed getting the post");
    }
    return result.post;
  } catch (err) {
    console.error(err.message);
  }
}

export function UpsertPostPage({ mode }) {
  const post = useLoaderData();
  const [content, setContent] = useState(post.content || "");
  const [title, setTitle] = useState(post.title || "");
  const [manualSlug, setManualSlug] = useState(post.slug || "");
  const [hasSetTheSlugManually, setHasSetTheSlugManually] = useState(false);
  const [categories, setCategories] = useState(post.categories || []);
  const [featuredImageURL, setFeaturedImageURL] = useState(
    post.featuredImageURL || null
  );
  const { addPost, addLoading, updatePost, updateLoading } = useUpSertPost();
  const [step, setStep] = useState(1);
  const slug =
    manualSlug || hasSetTheSlugManually
      ? manualSlug
      : title
          .toLowerCase()
          .replaceAll(/\s+/g, "-")
          .replaceAll(/[^a-z0-9\-]/g, "");
  const handleUpsert = async (published) => {
    const data = {
      title,
      slug,
      categories,
      content,
      featuredImageURL,
    };
    if (mode === "adding") await addPost(published, data);
    else if (mode === "editing")
      await updatePost(post.id, post.slug, published, data);
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
                disabled={addLoading}
                onClick={() => handleUpsert(true)}
              >
                Post and published
              </button>
              <button
                className="px-4 py-2 text-sm bg-pink-700 text-white cursor-pointer rounded hover:bg-pink-600"
                disabled={addLoading}
                onClick={() => handleUpsert(false)}
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
