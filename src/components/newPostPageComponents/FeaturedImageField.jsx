import { useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { PlusCircle } from "lucide-react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY
);

export function FeaturedImageField({ setFeaturedImageURL, featuredImageURL }) {
  const [featuredImageFile, setfeaturedImageFile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!featuredImageFile) return null;
    try {
      setError(null);
      setIsLoading(true);
      const { data, error } = await supabase.storage
        .from("blog images")
        .upload(
          `featured_images/${Date.now()}_${featuredImageFile.name}`,
          featuredImageFile
        );

      if (error) {
        throw new Error(error.message);
      }
      const { data: publicUrlData } = supabase.storage
        .from("blog images")
        .getPublicUrl(data.path);
      setFeaturedImageURL(publicUrlData.publicUrl);
    } catch (error) {
      setError(error.message);

      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <section className="flex flex-col mx-auto gap-2 max-w-120 mb-4">
      <form onSubmit={handleSubmit} method="POST">
        <label
          className="text-lg text-gray-200 mb-4 block"
          htmlFor="featureImageInput"
        >
          Featured image
        </label>
        <input
          id="featureImageInput"
          className="hidden"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={false}
          disabled={isLoading}
          onChange={(e) => {
            setfeaturedImageFile(e.target.files[0]);
            setTimeout(() => e.target.form.requestSubmit(), 0);
          }}
        />
        <button
          disabled={isLoading}
          className="w-50 h-50 rounded-md overflow-hidden bg-gray-800/10 flex justify-center items-center cursor-pointer hover:bg-gray-800/20"
          type="button"
          onClick={handleClick}
        >
          {isLoading ? (
            <p>Loading...</p>
          ) : featuredImageURL ? (
            <img
              className="object-cover h-full w-full"
              src={featuredImageURL}
              alt="featured image preview"
            />
          ) : (
            <PlusCircle size={32} />
          )}
        </button>
      </form>
      {error && <p>Error: {error}</p>}
    </section>
  );
}
