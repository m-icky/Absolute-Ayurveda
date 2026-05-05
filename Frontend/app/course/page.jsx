"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";

// Configuration for your local Django backend
const API_BASE_URL = "http://127.0.0.1:8000/api/courses/";
const SERVER_URL = "http://127.0.0.1:8000";
const WHATSAPP_NUMBER = "919995267659";

// Helper function to split array into chunks of 5
const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

export default function CoursePage() {
  // Use an object to track the active card for EACH row independently
  const [activeCards, setActiveCards] = useState({});
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(API_BASE_URL);
        const data = await response.json();
        
        const activeCourses = data.filter(course => {
          if (!course.status) return true; 
          const status = String(course.status).toLowerCase();
          return status === 'active' || status === 'open';
        });
        
        setCourses(activeCourses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
    return imagePath.startsWith('http') ? imagePath : `${SERVER_URL}${imagePath}`;
  };

  const getWhatsAppLink = (course) => {
    const text = `Hello! I would like to enquire about the following course:
    
Course: ${course.title}
Description: ${course.description || course.desc}
Duration: ${course.duration}

Could you please provide more details?`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  // Group our courses into rows of 5
  const courseRows = chunkArray(courses, 5);

  return (
    <>
      <Navbar />
      <div 
        className="pt-32 pb-20 px-4 min-h-screen flex flex-col items-center" 
        style={{ background: "linear-gradient(to bottom, #6b7c5b, rgba(249, 249, 249, var(--tw-bg-opacity, 1)))" }}
      >
        <h1 
          className="text-white text-4xl md:text-5xl lg:text-6xl text-center mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          School of <span className="italic text-[#c9b79c]">Ayurveda</span>
        </h1>
        <p className="text-white text-center w-[60%] mb-16 font-light">
          Not just techniques—an invitation to embrace Ayurveda as a complete way of life.
        </p>
        
        {isLoading ? (
          <div className="text-white font-lato">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="text-white font-lato">No active courses available at the moment.</div>
        ) : (
          /* Container for the multiple rows */
          <div className="flex flex-col gap-10 w-full max-w-7xl items-center">
            
            {courseRows.map((row, rowIndex) => (
              <div 
                key={rowIndex} 
                className="flex flex-col md:flex-row w-full h-[70vh] gap-4 md:gap-5 overflow-hidden"
              >
                {row.map((course, colIndex) => {
                  // Determine if this specific card is active in its row (defaults to the first card)
                  const isActive = activeCards[rowIndex] !== undefined 
                    ? activeCards[rowIndex] === colIndex 
                    : colIndex === 0;

                  return (
                    <div
                      key={course.id || colIndex}
                      // Update the active state for just THIS row
                      onClick={() => setActiveCards(prev => ({ ...prev, [rowIndex]: colIndex }))}
                      className={`relative rounded-[40px] md:rounded-[60px] cursor-pointer overflow-hidden bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out bg-gray-800 ${
                        isActive ? "flex-[5]" : "flex-[1]"
                      }`}
                      style={{
                        backgroundImage: `url('${getImageUrl(course.image)}')`,
                      }}
                    >
                      {/* Dark overlay for contrast */}
                      <div className={`absolute inset-0 bg-black/40 transition-opacity duration-700 ${isActive ? "opacity-30" : "opacity-80"}`} />
                      
                      {/* Active Content */}
                      <div 
                        className={`absolute bottom-8 md:bottom-12 left-8 md:left-12 right-8 md:right-12 text-white transition-all duration-500 ${
                          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                      >
                        <h3 className="text-2xl md:text-4xl font-semibold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {course.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-200 mb-4 max-w-md italic font-light line-clamp-3">
                          &ldquo;{course.description || course.desc}&rdquo;
                        </p>
                        <p className="text-sm md:text-base font-medium text-[#C9B79C]">
                          {course.duration}
                        </p>
                      </div>

                      {/* WhatsApp Enquire Button */}
                      <div className={`absolute bottom-8 md:bottom-12 right-8 md:right-12 transition-opacity duration-300 ${
                        isActive ? "opacity-100 delay-500" : "opacity-0 pointer-events-none"
                      }`}>
                        <a 
                          href={getWhatsAppLink(course)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <button className="bg-[#D2B48C] text-[#1A1A1A] px-8 py-3 rounded-full text-sm font-medium hover:bg-white transition-all duration-300 shadow-xl">
                            Enquire on WhatsApp
                          </button>
                        </a>
                      </div>

                      {/* Vertical Text */}
                      <div
                        className={`hidden md:block absolute bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap -rotate-90 origin-center text-white/40 font-bold tracking-[0.2em] uppercase text-xs transition-opacity duration-300 ${
                          isActive ? "opacity-0" : "opacity-100 delay-300"
                        }`}
                      >
                        {course.title ? course.title.replace(" Workshop", "") : ""}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
            
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}