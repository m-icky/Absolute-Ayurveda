export const metadata = {
  title: "Terms & Conditions | Absolute Ayurveda",
  description: "Read the Terms and Conditions for using the Absolute Ayurveda website and services.",
};

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TermsAndConditions() {
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 px-4 md:px-8 lg:px-16 min-h-screen bg-[#F7F5F0]">
        <div 
          className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-sm rounded-2xl border border-[rgba(201,183,156,0.3)] opacity-0"
          style={{ animation: "fadeIn 0.8s ease-out forwards" }}
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          
          <h1 
            className="text-4xl md:text-5xl text-[#6b7c5b] text-center mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Terms & Conditions
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6 font-['Lato'] leading-relaxed">
            <p className="font-semibold text-lg text-[#1A1A1A]">Welcome to Absolute Ayur.</p>
            <p>By accessing or using this website, you agree to comply with and be bound by the following terms and conditions.</p>

            <div>
              <h2 className="text-2xl text-[#6b7c5b] font-semibold mb-3 mt-8" style={{ fontFamily: "'Playfair Display', serif" }}>1. Website Usage</h2>
              <p>The content of this website is for general information and commercial purposes only. Unauthorized use of this website may result in legal action.</p>
            </div>

            <div>
              <h2 className="text-2xl text-[#6b7c5b] font-semibold mb-3 mt-8" style={{ fontFamily: "'Playfair Display', serif" }}>2. Product Information</h2>
              <p>We strive to ensure all product descriptions, pricing, and information are accurate. However, errors may occasionally occur, and we reserve the right to correct them without prior notice.</p>
            </div>

            <div>
              <h2 className="text-2xl text-[#6b7c5b] font-semibold mb-3 mt-8" style={{ fontFamily: "'Playfair Display', serif" }}>3. Medical Disclaimer</h2>
              <p>The information provided on this website is not intended to replace professional medical advice, diagnosis, or treatment. Users should consult qualified healthcare professionals before using Ayurvedic products for medical conditions.</p>
            </div>

            <div>
              <h2 className="text-2xl text-[#6b7c5b] font-semibold mb-3 mt-8" style={{ fontFamily: "'Playfair Display', serif" }}>4. Orders & Payments</h2>
              <p>All orders are subject to availability and confirmation. We reserve the right to cancel or refuse any order at our discretion.</p>
            </div>

            <div>
              <h2 className="text-2xl text-[#6b7c5b] font-semibold mb-3 mt-8" style={{ fontFamily: "'Playfair Display', serif" }}>5. Intellectual Property</h2>
              <p>All website content including text, images, logos, graphics, and product information is the property of Absolute Ayur and may not be copied or reused without permission.</p>
            </div>

            <div>
              <h2 className="text-2xl text-[#6b7c5b] font-semibold mb-3 mt-8" style={{ fontFamily: "'Playfair Display', serif" }}>6. Limitation of Liability</h2>
              <p>Absolute Ayur shall not be held liable for any direct or indirect damages arising from the use of this website or its products.</p>
            </div>

            <div>
              <h2 className="text-2xl text-[#6b7c5b] font-semibold mb-3 mt-8" style={{ fontFamily: "'Playfair Display', serif" }}>7. Changes to Terms</h2>
              <p>We may update these terms at any time without prior notice. Continued use of the website constitutes acceptance of the revised terms.</p>
            </div>

            <div>
              <h2 className="text-2xl text-[#6b7c5b] font-semibold mb-3 mt-8" style={{ fontFamily: "'Playfair Display', serif" }}>8. Governing Law</h2>
              <p>These terms shall be governed by the laws of India.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
