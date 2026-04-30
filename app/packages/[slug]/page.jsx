"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { packagesData } from "../data";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useEffect, useState } from "react";

export default function PackageDetailsPage() {
  const { slug } = useParams();
  const [pkg, setPkg] = useState(null);

  useEffect(() => {
    if (slug) {
      const found = packagesData.find((p) => p.slug === slug);
      setPkg(found);
    }
  }, [slug]);

  if (!pkg) return <div className="min-h-screen pt-32 text-center">Loading...</div>;

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 bg-white min-h-screen"   style={{
    background: "linear-gradient(to bottom, #6b7c5b, rgba(249, 249, 249, var(--tw-bg-opacity, 1)))"
  }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          
          <Link href="/packages" className="inline-flex items-center text-white hover:text-white transition-colors mb-10 text-sm tracking-widest uppercase">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Packages
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl overflow-hidden shadow-xl"
            >
              <img src={pkg.image} alt={pkg.title} className="w-full h-[500px] object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex gap-3 mb-6">
                 {pkg.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-bold tracking-widest px-3 py-1 rounded" style={{ backgroundColor: tag.color, color: 'rgba(0,0,0,0.7)' }}>
                      {tag.label}
                    </span>
                 ))}
              </div>
              <h1 className="text-5xl font-light text-[#1a1a1a] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                {pkg.title}
              </h1>
              <div className="w-16 h-px bg-[#000000] mb-8"></div>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                {pkg.description}
                <br /><br />
                This comprehensive Ayurvedic program is tailored to restore balance, enhance your well-being, and rejuvenate your body and mind. Our expert practitioners will guide you through a personalized journey of healing and relaxation.
              </p>

              <button 
                className="text-xs tracking-[3px] uppercase px-10 py-4 text-white transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: pkg.buttonColor }}
              >
                Book This Package
              </button>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
