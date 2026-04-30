"use client";

import { motion } from "framer-motion";
import Link from "next/link"; // Next.js link wait, it's just 'next/link'
import { packagesData } from "./data";
import styles from "./Packages.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function PackagesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 bg-[#f9f9f9] min-h-screen"   style={{
    background: "linear-gradient(to bottom, #6b7c5b, rgba(249, 249, 249, var(--tw-bg-opacity, 1)))"
  }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 flex flex-col items-center"
          >
            <h1 className="text-5xl md:text-6xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Special Ayurveda <span className="italic text-[#c9b79c]">programs</span>
            </h1>
            <p className="text-white max-w-2xl text-lg">
              Discover our programs with our range of treatments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packagesData.map((pkg, index) => (
              <motion.div
                key={pkg.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.card}>
                  <div className={styles.imageContainer}>
                    <img src={pkg.image} alt={pkg.title} className={styles.imgElement} />
                    <div className={styles.cutout}>
                      <Link href={`/packages/${pkg.slug}`} className={styles.arrowButton} style={{ backgroundColor: pkg.buttonColor }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                  
                  <div className={styles.content}>
                    <h3 className={styles.title}>{pkg.title}</h3>
                    <p className={styles.description}>{pkg.description}</p>
                    <div className={styles.tags}>
                      {pkg.tags.map((tag, i) => (
                        <span key={i} className={styles.tag} style={{ backgroundColor: tag.color, color: 'rgba(0,0,0,0.7)' }}>
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
