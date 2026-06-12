"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useEffect, useState } from "react";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const WHATSAPP_NUMBER = "919995267659";

export default function CourseDetailsPage() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const fetchCourse = async () => {
        try {
          const response = await fetch(`${SERVER_URL}/api/courses/${slug}/`);
          const data = await response.json();
          setCourse(data);
        } catch (error) {
          console.error("Failed to fetch course:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchCourse();
    }
  }, [slug]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    return imagePath.startsWith("http") ? imagePath : `${SERVER_URL}${imagePath}`;
  };

  const getWhatsAppLink = (courseData) => {
    let text = `Hello! I would like to enquire about the following course:\n\n`;
    text += `*Course:* ${courseData.title}\n`;
    if (courseData.duration) text += `*Duration:* ${courseData.duration}\n`;
    if (courseData.level)    text += `*Level:* ${courseData.level}\n`;
    text += `\nCould you please provide more details?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  if (isLoading)
    return (
      <div className="min-h-screen pt-32 text-center text-[#1a1a1a]" style={{ background: "#f8f6f0" }}>
        Loading...
      </div>
    );

  if (!course || course.error)
    return (
      <div className="min-h-screen pt-32 text-center text-[#1a1a1a]" style={{ background: "#f8f6f0" }}>
        Course not found.
      </div>
    );

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 min-h-screen bg-[#f8f6f0]">
        <div className="max-w-5xl mx-auto px-6 md:px-12">

          {/* Back link */}
          <Link
            href="/course"
            className="inline-flex items-center text-[#6b7c5b] hover:text-[#1a1a1a] transition-colors mb-10 text-sm tracking-widest uppercase"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Courses
          </Link>

          <div className="grid grid-cols-1 gap-16 items-center">

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl overflow-hidden shadow-xl"
            >
              <img
                src={getImageUrl(course.image)}
                alt={course.title}
                className="w-full h-[500px] object-cover"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1
                className="text-5xl font-light text-[#1a1a1a] mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {course.title}
              </h1>

              <div className="w-16 h-px bg-[#000000] mb-8" />

              {/* Meta badges */}
              <div className="flex flex-wrap gap-4 mb-8">
                {course.duration && (
                  <span className="inline-flex items-center gap-2 bg-[#f0ece4] text-[#6b7c5b] text-sm font-medium px-5 py-2 rounded-full">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.duration}
                  </span>
                )}
                {course.level && (
                  <span className="inline-flex items-center gap-2 bg-[#f0ece4] text-[#6b7c5b] text-sm font-medium px-5 py-2 rounded-full">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.level}
                  </span>
                )}
              </div>

              {/* Description */}
              {course.description && (
                <p className="text-gray-600 text-lg leading-relaxed mb-10 whitespace-pre-wrap">
                  {course.description}
                </p>
              )}

              {/* Enquire on WhatsApp Button */}
              <a
                href={getWhatsAppLink(course)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className="text-xs tracking-[3px] uppercase px-10 py-4 text-white transition-all duration-300 hover:shadow-lg rounded-full"
                  style={{ backgroundColor: "#D2B48C" }}
                >
                  Enquire on WhatsApp
                </button>
              </a>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
