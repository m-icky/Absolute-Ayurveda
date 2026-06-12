"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BlogCard from "../../components/BlogCard";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/`);
        if (response.ok) {
          const data = await response.json();
          const activePosts = data.filter(
            (p) => !p.status || String(p.status).toLowerCase() === "active"
          );

          if (activePosts.length > 0) {
            const mappedPosts = activePosts.map((p) => {
              const postImg =
                p.image && !p.image.startsWith("http")
                  ? `${process.env.NEXT_PUBLIC_SERVER_URL}${p.image}`
                  : p.image;

              let authorAvatar = p.author?.avatar;
              if (authorAvatar && !authorAvatar.startsWith("http")) {
                authorAvatar = `${process.env.NEXT_PUBLIC_SERVER_URL}${authorAvatar}`;
              }

              return {
                ...p,
                image: postImg,
                author: {
                  name:
                    p.author?.name ||
                    p.author_name ||
                    "Dr. Naveen Kumar",
                  avatar:
                    authorAvatar ||
                    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100",
                },
              };
            });
            setPosts(mappedPosts);
          } else {
            setPosts([]);
          }
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Failed to fetch blog posts from backend:", error);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  /* unique categories */
  const getUniqueCategories = () => {
    const seen = new Set();
    const result = ["All"];
    posts.forEach((post) => {
      if (post.category) {
        const normalized = post.category.trim();
        const lower = normalized.toLowerCase();
        if (!seen.has(lower)) {
          seen.add(lower);
          result.push(normalized);
        }
      }
    });
    return result;
  };

  const categoriesToRender = getUniqueCategories();

  /* filter */
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" ||
      (post.category &&
        post.category.toLowerCase() === selectedCategory.toLowerCase());
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8f6f0] flex flex-col">
      <Navbar />

      {/* Header */}
      <div className="pt-32 md:pt-40 pb-16 px-6 text-center max-w-[1200px] mx-auto w-full">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#1a1a1a] mb-6 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          The Ayurveda <span className="italic text-[#c9b79c]">Chronicles</span>
        </h1>
        <div className="w-[60px] h-[1px] bg-[#c9b79c] mx-auto my-6" />
        <p className="text-sm md:text-base text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
          A collection of curated articles on ancient healing, holistic
          nutrition, and mindful living, bridging time-tested Vedic secrets with
          the demands of modern lives.
        </p>
      </div>

      {/* Filters */}
      <div className="w-full max-w-[900px] mx-auto px-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 md:gap-3">
          {categoriesToRender.map((cat) => {
            const isActive =
              selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[10px] tracking-[2px] uppercase px-4 py-2 border transition-all duration-300 font-semibold ${
                  isActive
                    ? "bg-[#6b7c5b] border-[#6b7c5b] text-white"
                    : "bg-transparent border-gray-300/60 text-gray-500 hover:border-[#6b7c5b] hover:text-[#6b7c5b]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-[260px]">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#e2dada] px-4 py-2 text-xs focus:outline-none focus:border-[#6b7c5b] transition-all text-[#1a1a1a]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a1a1a] text-xs font-semibold"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Cards */}
      <div className="flex-grow w-full max-w-[1200px] mx-auto px-6 pb-24 flex flex-col items-center">
        {isLoading ? (
          <div className="text-center py-20 font-lato text-sm text-gray-400">
            Loading articles...
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="w-full flex flex-col items-center">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-[#e2dada]/40 w-full max-w-[900px] p-8 shadow-sm">
            <span className="text-sm text-gray-400 font-light block mb-2">
              No articles found matching your criteria.
            </span>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-[10px] tracking-[2px] uppercase text-[#6b7c5b] font-bold border-b border-[#6b7c5b] pb-0.5 mt-4 hover:text-[#c9b79c] hover:border-[#c9b79c] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
