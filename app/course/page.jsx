"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState } from "react";
import Link from "next/link";

const courses = [
  {
    title: "Ayurveda Massage Workshop",
    desc: "You will be capable of giving general body massage",
    duration: "10 hours (2h per day)",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Ayurveda Cooking Workshop",
    desc: "You will be capable of preparing ayurvedic diet followed food",
    duration: "10 hours (2h per day)",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Basic Ayurveda Workshop",
    desc: "You will be capable of doing prakriti analysis",
    duration: "24 hours (2h per day)",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Intermediate Ayurveda Workshop",
    desc: "You will be capable of giving diet advice and massage",
    duration: "40 hours (3h per day)",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Advanced Ayurveda Workshop",
    desc: "You will be capable of preparing medicines and giving massages",
    duration: "70 hours (3h per day)",
    image: "https://images.unsplash.com/photo-1608283363381-127e9e30a59b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
];

export default function CoursePage() {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 px-4 min-h-screen flex flex-col items-center" style={{
      background: "linear-gradient(to bottom, #6b7c5b, rgba(249, 249, 249, var(--tw-bg-opacity, 1)))"}}>
        <h1 
          className="text-white text-4xl md:text-5xl lg:text-6xl text-center mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          School of <span className="italic text-[#c9b79c]">Ayurveda</span>
        </h1>
        <p className="text-white text-center w-[60%] mb-16">Not just techniques—an invitation to embrace Ayurveda as a complete
            way of life.</p>
        
        <div className="flex flex-col md:flex-row w-full max-w-7xl h-[70vh] md:h-[70vh] gap-4 md:gap-6 overflow-hidden">
          {courses.map((course, index) => (
            <div
              key={index}
              onClick={() => setActiveCard(index)}
              className={`relative rounded-3xl md:rounded-[50px] cursor-pointer overflow-hidden bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out ${
                activeCard === index ? "flex-[5]" : "flex-[1]"
              }`}
              style={{
                backgroundImage: `url('${course.image}')`,
              }}
            >
              {/* Overlay for better readability */}
              <div className="absolute inset-0 bg-black/40 transition-opacity duration-700 hover:bg-black/30" />
              
              {/* Content visible when active */}
              <div 
                className={`absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10 text-white transition-opacity duration-300 ${
                  activeCard === index ? "opacity-100 delay-300" : "opacity-0"
                }`}
              >
                <h3 className="text-xl md:text-3xl font-bold mb-2 md:mb-4 drop-shadow-md" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {course.title}
                </h3>
                <div className={`overflow-hidden transition-all duration-500 max-w-lg ${activeCard === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                  <p className="text-sm md:text-base text-gray-200 mb-2 drop-shadow-md">
                    &ldquo;{course.desc}&rdquo;
                  </p>
                  <p className="text-sm md:text-base font-semibold text-[#C9B79C] drop-shadow-md">
                    {course.duration}
                  </p>
                </div>
              </div>
              <div className={`absolute bottom-6 md:bottom-10 right-6 md:right-10 text-white transition-opacity duration-300 z-10 ${
                activeCard === index ? "opacity-100 delay-300 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}>
                <Link href="/#contact">
                  <button className="bg-[#C9B79C] text-[#1A1A1A] px-6 py-2 md:px-8 md:py-3 rounded-full text-sm md:text-base hover:bg-[#6b7c5b] hover:text-white transition-colors duration-300 shadow-lg">
                    Enquire
                  </button>
                </Link>
              </div>

              {/* Vertical Title (visible when inactive, hidden on mobile) */}
              <div
                className={`hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap -rotate-90 origin-bottom-left text-white/80 font-bold tracking-widest uppercase text-sm transition-opacity duration-300 ${
                  activeCard === index ? "opacity-0" : "opacity-100 delay-300"
                }`}
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {course.title.replace(" Workshop", "")}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
