"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useEffect, useState } from "react";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
// Replace this with your actual WhatsApp number
const WHATSAPP_NUMBER = "919995267659"; 

export default function PackageDetailsPage() {
  const { slug } = useParams();
  const [pkg, setPkg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const fetchSinglePackage = async () => {
        try {
          const response = await fetch(`${SERVER_URL}/api/packages/${slug}/`);
          const data = await response.json();
          setPkg(data);
        } catch (error) {
          console.error("Failed to fetch package:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchSinglePackage();
    }
  }, [slug]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    return imagePath.startsWith('http') ? imagePath : `${SERVER_URL}${imagePath}`;
  };

  const getWhatsAppLink = (packageData) => {
    let text = `Hello! I would like to book the following package:\n\n`;
    text += `*Package:* ${packageData.title}\n`;
    
    const categories = packageData.sections && packageData.sections.length > 0 
      ? packageData.sections.map(s => s.heading).filter(Boolean).join(", ") 
      : packageData.heading;

    if (categories) {
      text += `*Category:* ${categories}\n`;
    }
    if (packageData.price) {
      text += `*Price:* ${packageData.price}\n`;
    }
    
    text += `\nCould you please provide more details on availability?`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  if (isLoading) return <div className="min-h-screen pt-32 text-center text-[#1a1a1a]" style={{ background: "#6b7c5b" }}>Loading...</div>;
  if (!pkg) return <div className="min-h-screen pt-32 text-center text-[#1a1a1a]" style={{ background: "#6b7c5b" }}>Package not found.</div>;

  return (
    <>
      <Navbar />
      <main 
        className="pt-32 pb-20 min-h-screen bg-[#f8f6f0]"   
      >
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          
          <Link href="/packages" className="inline-flex items-center text-[#6b7c5b] hover:text-[#1a1a1a] transition-colors mb-10 text-sm tracking-widest uppercase">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Packages
          </Link>

          <div className="grid grid-cols-1 gap-16 items-center">
            
            {/* Left Column: Image with Slide-in Animation */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl overflow-hidden shadow-xl"
            >
              <img src={getImageUrl(pkg.image)} alt={pkg.title} className="w-full h-[500px] object-cover" />
            </motion.div>

            {/* Right Column: Content with Slide-in Animation */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-5xl font-light text-[#1a1a1a] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                {pkg.title}
              </h1>
              
              <div className="w-16 h-px bg-[#000000] mb-8"></div>
              
              {pkg.main_description && (
                <p className="text-gray-600 text-lg leading-relaxed mb-8 whitespace-pre-wrap">
                  {pkg.main_description}
                </p>
              )}

              {pkg.sections && pkg.sections.length > 0 ? (
                <div className="space-y-6 mb-8">
                  {pkg.sections.map((sec, idx) => (
                    <div key={idx}>
                      {sec.heading && <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">{sec.heading}</h3>}
                      {sec.description && <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">{sec.description}</p>}
                    </div>
                  ))}
                </div>
              ) : pkg.description ? (
                <p className="text-gray-600 text-lg leading-relaxed mb-4 whitespace-pre-wrap">
                  {pkg.description}
                </p>
              ) : null}
              
              
              {pkg.price && (
                <div className="text-2xl font-semibold text-[#6b7c5b] mb-8">
                  {pkg.price} ₹
                </div>
              )}

              {/* Updated WhatsApp Book Button */}
              <a 
                href={getWhatsAppLink(pkg)} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <button 
                  className="text-xs tracking-[3px] uppercase px-10 py-4 text-white transition-all duration-300 hover:shadow-lg rounded-full"
                  style={{ backgroundColor: '#6b7c5b' }}
                >
                  Book on WhatsApp
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