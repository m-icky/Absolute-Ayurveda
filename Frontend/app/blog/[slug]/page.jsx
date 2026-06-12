"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useEffect, useState } from "react";
import { FaRegEye, FaRegHeart, FaHeart } from "react-icons/fa";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const API_BASE   = process.env.NEXT_PUBLIC_API_URL;

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [post, setPost]       = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked]     = useState(false);
  const [likes, setLikes]     = useState(0);
  const [views, setViews]     = useState(0);

  /* fetch post + increment view */
  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        const res  = await fetch(`${SERVER_URL}/api/blogs/${slug}/`);
        const data = await res.json();
        setPost(data);
        setLikes(data.likes || 0);
        setViews(data.views || 0);

        /* fire view count */
        fetch(`${API_BASE}/blogs/${slug}/view/`, { method: "POST" })
          .then(r => r.json()).then(d => setViews(d.views)).catch(() => {});
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [slug]);

  const getImageUrl = (p) =>
    !p ? "" : p.startsWith("http") ? p : `${SERVER_URL}${p}`;

  const handleLike = async () => {
    const action = liked ? "unlike" : "like";
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
    try {
      const res = await fetch(`${API_BASE}/blogs/${slug}/like/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (res.ok) { const d = await res.json(); setLikes(d.likes); }
    } catch { /* revert */ setLiked(liked); setLikes(prev => liked ? prev + 1 : prev - 1); }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
  };

  /* ── loading / error ── */
  if (isLoading)
    return (
      <div className="min-h-screen pt-32 text-center bg-[#f8f6f0]">
        <div className="inline-block w-10 h-10 rounded-full border-4 border-[#c9b79c] border-t-transparent animate-spin mt-10" />
      </div>
    );
  if (!post || post.error)
    return (
      <div className="min-h-screen pt-32 text-center bg-[#f8f6f0]">
        <p className="text-[#1a1a1a] text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
          Article not found.
        </p>
      </div>
    );

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24 min-h-screen bg-[#f8f6f0]">
        <div className="max-w-3xl mx-auto px-6 md:px-8">

          {/* Back */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center text-[#6b7c5b] hover:text-[#1a1a1a] transition-colors mb-10 text-xs tracking-widest uppercase"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              All Articles
            </Link>
          </motion.div>

          {/* Category + Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            {post.category && (
              <span className="text-[10px] tracking-[4px] uppercase text-[#6b7c5b] font-semibold mb-4 block">
                {post.category}
              </span>
            )}
            <h1
              className="text-3xl md:text-5xl font-light text-[#1a1a1a] leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {post.title}
            </h1>

            {/* Author row */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-3">
                <img
                  src={post.author?.avatar || getImageUrl(post.author_avatar)}
                  alt={post.author?.name || post.author_name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
                />
                <div>
                  <p className="text-sm font-semibold text-[#1a1a1a]">
                    {post.author?.name || post.author_name || "Dr. Naveen Kumar"}
                  </p>
                  <p className="text-xs text-gray-400">{formatDate(post.date)}</p>
                </div>
              </div>

              {/* Views + Like */}
              <div className="flex items-center gap-5 text-gray-400 text-sm">
                <span className="flex items-center gap-1.5">
                  <FaRegEye className="text-base" /> {views}
                </span>
                <button
                  onClick={handleLike}
                  className="flex items-center gap-1.5 transition-colors duration-200 hover:text-red-400"
                >
                  {liked
                    ? <FaHeart className="text-red-500 text-base" />
                    : <FaRegHeart className="text-base" />}
                  <span className={liked ? "text-red-500" : ""}>{likes}</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl overflow-hidden shadow-lg mb-10"
          >
            <img
              src={getImageUrl(post.image)}
              alt={post.title}
              className="w-full h-[340px] md:h-[460px] object-cover"
            />
          </motion.div>

          {/* Article body */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose-ayurveda"
          >
            {/* Excerpt pull-quote */}
            {post.excerpt && (
              <p
                className="text-base md:text-lg text-[#6b7c5b] italic font-normal pl-5 border-l-4 border-[#c9b79c] mb-10 leading-relaxed"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {post.excerpt}
              </p>
            )}

            {/* Full content */}
            <div className="space-y-5 text-gray-600 text-base leading-[1.9] font-light">
              {post.content
                ? post.content.split(/\n+/).filter(Boolean).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))
                : <p className="italic text-gray-400">Content coming soon…</p>
              }
            </div>
          </motion.article>

          {/* Divider + Like CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-14 pt-8 border-t border-[#e8e2d6] flex items-center justify-between flex-wrap gap-4"
          >
            <p className="text-xs text-gray-400 tracking-wide">Did you find this article helpful?</p>
            <button
              onClick={handleLike}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                liked
                  ? "bg-red-50 border-red-200 text-red-500"
                  : "bg-white border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-400"
              }`}
            >
              {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              {liked ? "Liked" : "Like this article"}
            </button>
          </motion.div>

        </div>
      </main>
      <Footer />
    </>
  );
}
