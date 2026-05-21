export const metadata = {
  title: "Privacy Policy | Absolute Ayurveda",
  description: "Read the Privacy Policy of Absolute Ayurveda to understand how we collect, use, and protect your personal information.",
};

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6 font-['Lato'] leading-relaxed">
            <p className="font-semibold text-lg text-[#1A1A1A]">Absolute Ayur values and respects your privacy.</p>

            <div>
              <h2 className="text-2xl text-[#6b7c5b] font-semibold mb-3 mt-8" style={{ fontFamily: "'Playfair Display', serif" }}>1. Information We Collect</h2>
              <p>We may collect personal information such as:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Name</li>
                <li>Phone number</li>
                <li>Email address</li>
                <li>Shipping and billing address</li>
                <li>Order details</li>
                <li>Website usage information</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl text-[#6b7c5b] font-semibold mb-3 mt-8" style={{ fontFamily: "'Playfair Display', serif" }}>2. How We Use Information</h2>
              <p>Collected information may be used to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Process orders</li>
                <li>Provide customer support</li>
                <li>Improve our services</li>
                <li>Send updates or promotional communication</li>
                <li>Maintain website security</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl text-[#6b7c5b] font-semibold mb-3 mt-8" style={{ fontFamily: "'Playfair Display', serif" }}>3. Data Protection</h2>
              <p>We take reasonable measures to protect user information from unauthorized access or misuse.</p>
            </div>

            <div>
              <h2 className="text-2xl text-[#6b7c5b] font-semibold mb-3 mt-8" style={{ fontFamily: "'Playfair Display', serif" }}>4. Cookies</h2>
              <p>Our website may use cookies and analytics tools to improve user experience and website performance.</p>
            </div>

            <div>
              <h2 className="text-2xl text-[#6b7c5b] font-semibold mb-3 mt-8" style={{ fontFamily: "'Playfair Display', serif" }}>5. Third-Party Services</h2>
              <p>We may use trusted third-party services such as payment gateways, analytics providers, and delivery partners. These services may have their own privacy policies.</p>
            </div>

            <div>
              <h2 className="text-2xl text-[#6b7c5b] font-semibold mb-3 mt-8" style={{ fontFamily: "'Playfair Display', serif" }}>6. User Rights</h2>
              <p>Users may request correction or deletion of their personal information by contacting us.</p>
            </div>

            <div>
              <h2 className="text-2xl text-[#6b7c5b] font-semibold mb-3 mt-8" style={{ fontFamily: "'Playfair Display', serif" }}>7. Policy Updates</h2>
              <p>This privacy policy may be updated periodically without prior notice.</p>
            </div>

            <div>
              <h2 className="text-2xl text-[#6b7c5b] font-semibold mb-3 mt-8" style={{ fontFamily: "'Playfair Display', serif" }}>8. Contact</h2>
              <p>For privacy-related concerns, users may contact us through the official website:<br/>
                <a href="http://www.absoluteayur.com/" className="text-[#C9B79C] hover:text-[#6b7c5b] transition-colors duration-300">http://www.absoluteayur.com/</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
