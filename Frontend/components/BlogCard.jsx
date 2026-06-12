"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaRegEye, FaRegHeart, FaHeart, FaRegEnvelope, FaShareAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function BlogCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);
  const [viewsCount, setViewsCount] = useState(post.views || 0);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [showMailTooltip, setShowMailTooltip] = useState(false);

  const handleLike = async (e) => {
    e.stopPropagation();
    const action = liked ? "unlike" : "like";
    // Optimistic UI update
    setLiked(!liked);
    setLikesCount((prev) => liked ? prev - 1 : prev + 1);
    try {
      const res = await fetch(`${API_BASE}/blogs/${post.id}/like/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (res.ok) {
        const data = await res.json();
        setLikesCount(data.likes);
      }
    } catch (err) {
      // Revert on error
      setLiked(liked);
      setLikesCount((prev) => liked ? prev + 1 : prev - 1);
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/blog/${post.slug}`);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    }
  };

  const handleMail = (e) => {
    e.stopPropagation();
    setShowMailTooltip(true);
    setTimeout(() => setShowMailTooltip(false), 2000);
  };

  // Format date: "12" and "JANUARY"
  const dateObj = new Date(post.date);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const monthName = dateObj.toLocaleString("en-US", { month: "long" }).toUpperCase();

  return (
    <>
      <Link href={`/blog/${post.slug}`} className="block w-full max-w-[900px]">
      <div
        className="group w-full bg-white rounded-none shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.12)] flex flex-col md:flex-row relative mt-16 mb-8 p-6 md:p-8 min-h-[300px] transition-all duration-500 ease-out border border-[#e2dada]/40 cursor-pointer"
        style={{ fontFamily: "'Lato', sans-serif" }}
      >
        {/* Left Column: Image, Date, Socials */}
        <div className="w-full md:w-[45%] flex flex-col justify-between relative min-h-[220px] md:min-h-auto">
          
          {/* Floating Image */}
          <div className="w-full md:absolute md:top-[-45px] md:left-[-35px] md:w-[105%] h-[200px] md:h-[230px] overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.15)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.22)] group-hover:-translate-y-2 group-hover:-translate-x-1 transition-all duration-500 ease-out z-10">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Overlay color glow on hover */}
            <div className="absolute inset-0 bg-[#6b7c5b]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>

          {/* Space reserved under image in desktop view to push date & social down */}
          <div className="hidden md:block h-[200px] pointer-events-none"></div>

          {/* Date and Socials container */}
          <div className="flex items-end justify-between mt-4 md:mt-auto pt-2 z-20">
            
            {/* Large Date Display */}
            <div className="flex flex-col select-none">
              <span className="text-5xl md:text-6xl font-light tracking-tighter text-gray-300 leading-none group-hover:text-[#c9b79c] transition-colors duration-500">
                {day}
              </span>
              <span className="text-[10px] md:text-xs font-semibold tracking-[3px] text-gray-400 uppercase mt-1">
                {monthName}
              </span>
            </div>

            {/* Social Action Icons */}
            <div className="flex items-center gap-4 text-gray-400 text-lg mb-1 relative">
              
              {/* Views counter */}
              <div className="flex items-center gap-1 group/item cursor-default" title={`${viewsCount} Views`}>
                <FaRegEye className="text-gray-400 group-hover/item:text-[#6b7c5b] transition-colors duration-300" />
                <span className="text-[11px] text-gray-400 font-medium select-none">{viewsCount}</span>
              </div>

              {/* Like Button */}
              <button 
                onClick={handleLike}
                className="group/item focus:outline-none flex items-center gap-1"
                title="Like post"
              >
                {liked ? (
                  <FaHeart className="text-red-500 scale-110 transition-transform duration-300" />
                ) : (
                  <FaRegHeart className="text-gray-400 group-hover/item:text-red-500 transition-colors duration-300" />
                )}
                <span className={`text-[11px] font-medium transition-colors duration-300 ${liked ? 'text-red-500' : 'text-gray-400'}`}>
                  {likesCount}
                </span>
              </button>

              {/* Email Icon */}
              <div className="relative">
                <button 
                  onClick={handleMail}
                  className="group/item focus:outline-none block pt-1" 
                  title="Subscribe to updates"
                >
                  <FaRegEnvelope className="text-gray-400 group-hover/item:text-[#6b7c5b] transition-colors duration-300" />
                </button>
                {showMailTooltip && (
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-30 shadow-md animate-fade-in">
                    Subscribed to updates!
                  </div>
                )}
              </div>

              {/* Share Icon */}
              <div className="relative">
                <button 
                  onClick={handleShare}
                  className="group/item focus:outline-none block pt-1" 
                  title="Copy link to clipboard"
                >
                  <FaShareAlt className="text-gray-400 group-hover/item:text-[#c9b79c] transition-colors duration-300" />
                </button>
                {showShareTooltip && (
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-30 shadow-md animate-fade-in">
                    Link copied!
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Title, Author, Text Content */}
        <div className="w-full md:w-[55%] flex flex-col justify-center mt-6 md:mt-0 md:pl-8 z-20">
          
          {/* Category Pill Tag */}
          <span className="text-[9px] font-bold tracking-[2.5px] uppercase text-[#6b7c5b] mb-2 select-none">
            {post.category}
          </span>

          {/* Title */}
          <h2 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] leading-snug group-hover:text-[#6b7c5b] transition-colors duration-300" style={{ fontFamily: "'Playfair Display', serif" }}>
            {post.title}
          </h2>

          {/* Author Badge Pill */}
          <div className="flex items-center mt-3 mb-4">
            <div className="flex items-center bg-[#6b7c5b]/10 hover:bg-[#6b7c5b]/15 px-3 py-1 rounded-full border border-[#6b7c5b]/15 transition-all duration-300 cursor-pointer">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-5 h-5 rounded-full object-cover mr-2 border border-white"
              />
              <span className="text-[10px] md:text-xs font-semibold text-[#6b7c5b] tracking-wider">
                {post.author.name}
              </span>
            </div>
          </div>

          {/* Subtle Horizontal Divider */}
          <div className="w-full h-[1px] bg-gray-100 mb-4" />

          {/* Excerpt Paragraph */}
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-light mb-5">
            {post.excerpt}
          </p>

          {/* Read More Link with premium hover slide out */}
          <div className="mt-auto pt-2">
            <button 
              className="relative inline-flex items-center text-[10px] tracking-[2px] uppercase font-bold text-[#1a1a1a] group/btn transition-colors duration-300 hover:text-[#6b7c5b]"
            >
              <span className="relative z-10 pr-2">Read Article</span>
              <span className="w-4 h-[1px] bg-[#1a1a1a] group-hover/btn:bg-[#6b7c5b] group-hover/btn:w-8 transition-all duration-300 ease-out" />
            </button>
          </div>

        </div>
      </div>
      </Link>
    </>
  );
}
