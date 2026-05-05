"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";

// Configuration for your local Django backend
const API_BASE_URL = "http://127.0.0.1:8000/api/courses/";
const SERVER_URL = "http://127.0.0.1:8000";
const WHATSAPP_NUMBER = "919995267659"; // Your WhatsApp number from the image

export default function CoursePage() {
  const [activeCard, setActiveCard] = useState(0);
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

  // Function to generate the WhatsApp link with pre-filled message
  const getWhatsAppLink = (course) => {
    const text = `Hello! I would like to enquire about the following course:
    
Course: ${course.title}
Description: ${course.description || course.desc}
Duration: ${course.duration}

Could you please provide more details?`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

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
          <div className="flex flex-col md:flex-row w-full max-w-7xl h-[70vh] gap-4 md:gap-5 overflow-hidden">
            {courses.map((course, index) => (
              <div
                key={course.id || index}
                onClick={() => setActiveCard(index)}
                className={`relative rounded-[40px] md:rounded-[60px] cursor-pointer overflow-hidden bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out bg-gray-800 ${
                  activeCard === index ? "flex-[5]" : "flex-[1]"
                }`}
                style={{
                  backgroundImage: `url('${getImageUrl(course.image)}')`,
                }}
              >
                {/* Dark overlay for contrast */}
                <div className={`absolute inset-0 bg-black/40 transition-opacity duration-700 ${activeCard === index ? "opacity-30" : "opacity-60"}`} />
                
                {/* Active Content */}
                <div 
                  className={`absolute bottom-8 md:bottom-12 left-8 md:left-12 right-8 md:right-12 text-white transition-all duration-500 ${
                    activeCard === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                >
                  <h3 className="text-2xl md:text-4xl font-semibold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {course.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-200 mb-4 max-w-md italic font-light">
                    &ldquo;{course.description || course.desc}&rdquo;
                  </p>
                  <p className="text-sm md:text-base font-medium text-[#C9B79C]">
                    {course.duration}
                  </p>
                </div>

                {/* WhatsApp Enquire Button */}
                <div className={`absolute bottom-8 md:bottom-12 right-8 md:right-12 transition-opacity duration-300 ${
                  activeCard === index ? "opacity-100 delay-500" : "opacity-0 pointer-events-none"
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
                    activeCard === index ? "opacity-0" : "opacity-100 delay-300"
                  }`}
                >
                  {course.title ? course.title.replace(" Workshop", "") : ""}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}