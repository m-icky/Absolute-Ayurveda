"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./Packages.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/packages/`;
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(API_BASE_URL);
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop";
    return imagePath.startsWith('http') ? imagePath : `${SERVER_URL}${imagePath}`;
  };

  return (
    <>
      <Navbar />
      <main 
        className="pt-32 pb-20 min-h-screen bg-[#f8f6f0]"   
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 flex flex-col items-center"
          >
            <h1 className="text-5xl md:text-6xl font-light text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Special Ayurveda <span className="italic text-[#c9b79c]">Programs</span>
            </h1>

            {/* Decorative Divider */}
            <div className="w-[60px] h-[1px] bg-[#c9b79c] mx-auto my-6" />
            <p className="text-sm md:text-base text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
              Discover our programs with our range of treatments.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="text-[#1a1a1a] text-center text-xl">Loading packages...</div>
          ) : packages.length === 0 ? (
            <div className="text-[#1a1a1a] text-center text-xl">No packages available.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className={styles.card}>
                    <div className={styles.imageContainer}>
                      <img src={getImageUrl(pkg.image)} alt={pkg.title} className={styles.imgElement} />
                      <div className={styles.cutout}>
                        {/* Links to the specific ID */}
                        <Link href={`/packages/${pkg.id}`} className={styles.arrowButton} style={{ backgroundColor: "#6b7c5b" }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Link>
                      </div>
                    </div>
                    
                    <div className={styles.content}>
                      
                      {/* TITLE SECOND */}
                      <h3 className={styles.title}>{pkg.title}</h3>
                      
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}