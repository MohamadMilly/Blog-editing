import { useState } from "react";
import PostTextAreaEditor from "../components/newPostPageComponents/PostTextAreaEditor";
import { CategoriesSelectList } from "../components/newPostPageComponents/CategoriesSelect";
import { FeaturedImageField } from "../components/newPostPageComponents/FeaturedImageField";
import { useUpSertPost } from "../hooks/useUpsertPost";
import { useLoaderData, useNavigate } from "react-router";
import { WizardNavigation } from "../components/newPostPageComponents/WizardNavigation";
import Spinner from "../components/Spinner";

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
  const { addPost, addLoading, updatePost, updateLoading, status } =
    useUpSertPost();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
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
    const isPreviousHome = step === 1;
    if (isPreviousHome) {
      navigate(-1);
    }
    if (step < 1) return;
    setStep(step - 1);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <main className="w-full px-2 sm:px-12 py-4 my-6 mx-auto text-gray-200 transition-all duration-300">
      <WizardNavigation
        goBack={goBack}
        goNext={goNext}
        step={step}
        maxStep={2}
      />
      {step === 1 && (
        <FeaturedImageField
          featuredImageURL={featuredImageURL}
          setFeaturedImageURL={setFeaturedImageURL}
        />
      )}
      <form onSubmit={(e) => e.preventDefault()} action="post">
        {step === 1 && (
          <section>
            <div className="flex flex-col mx-auto gap-4 max-w-120 mb-4">
              <label className="text-sm text-gray-200" htmlFor="title">
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
            <div className="flex flex-col mx-auto gap-4 max-w-120 mb-4 pb-6 border-b border-gray-400">
              <label
                className="
            text-sm text-gray-200"
                htmlFor="slug
        "
              >
                <span>Slug </span>
                <span className="text-xs italic bg-pink-200/10 text-pink-500 p-1 ml-1 rounded">
                  (used in the url)
                </span>
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
            <div className="flex items-center gap-x-2 flex-wrap my-4">
              <button
                className="flex items-center gap-x-2 px-4 py-2 text-sm bg-white text-pink-700 rounded cursor-pointer hover:bg-gray-200"
                disabled={addLoading}
                onClick={() => handleUpsert(true)}
              >
                <span>Post as published</span>
                {((status === "public" && addLoading) || updateLoading) && (
                  <Spinner size="sm" />
                )}
              </button>
              <button
                className="flex items-center gap-x-2 px-4 py-2 text-sm bg-pink-700 text-white cursor-pointer rounded hover:bg-pink-600"
                disabled={addLoading}
                onClick={() => handleUpsert(false)}
              >
                Keep in draft
                {((status === "private" && addLoading) || updateLoading) && (
                  <Spinner size="sm" color="white" />
                )}
              </button>
            </div>
          </section>
        )}
      </form>
    </main>
  );
}
