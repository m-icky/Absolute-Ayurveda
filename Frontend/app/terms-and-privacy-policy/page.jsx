export const metadata = {
  title: "Terms & Privacy Policy | Absolute Ayur",
  description: "Read the Terms & Conditions and Privacy Policy of Absolute Ayurveda.",
};

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TermsAndPrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 px-4 md:px-8 lg:px-16 min-h-screen bg-[#F7F5F0]">
        <div 
          className="max-w-4xl mx-auto space-y-12 opacity-0"
          style={{ animation: "fadeIn 0.8s ease-out forwards" }}
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 
              className="text-4xl md:text-5xl text-[#6b7c5b] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Legal
            </h1>
            <p className="text-gray-500 font-['Lato'] text-lg">Terms & Conditions and Privacy Policy</p>
          </div>

          {/* Terms & Conditions Card */}
          <div className="bg-white p-8 md:p-12 shadow-sm rounded-2xl border border-[rgba(201,183,156,0.3)]">
            <h2 
              className="text-3xl md:text-4xl text-[#6b7c5b] text-center mb-8 pb-6 border-b border-[#F7F5F0]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              TERMS & CONDITIONS
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6 font-['Lato'] leading-relaxed">
              <p className="font-semibold text-lg text-[#1A1A1A]">Welcome to Absolute Ayur.</p>
              <p>By accessing or using this website, you agree to comply with and be bound by the following terms and conditions.</p>

              <div>
                <h3 className="text-xl text-[#6b7c5b] font-semibold mb-2 mt-8" style={{ fontFamily: "'Playfair Display', serif" }}>1. Website Usage</h3>
                <p>The content of this website is for general information and commercial purposes only. Unauthorized use of this website may result in legal action.</p>
              </div>

              <div>
                <h3 className="text-xl text-[#6b7c5b] font-semibold mb-2 mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>2. Product Information</h3>
                <p>We strive to ensure all product descriptions, pricing, and information are accurate. However, errors may occasionally occur, and we reserve the right to correct them without prior notice.</p>
              </div>

              <div>
                <h3 className="text-xl text-[#6b7c5b] font-semibold mb-2 mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>3. Medical Disclaimer</h3>
                <p>The information provided on this website is not intended to replace professional medical advice, diagnosis, or treatment. Users should consult qualified healthcare professionals before using Ayurvedic products for medical conditions.</p>
              </div>

              <div>
                <h3 className="text-xl text-[#6b7c5b] font-semibold mb-2 mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>4. Orders & Payments</h3>
                <p>All orders are subject to availability and confirmation. We reserve the right to cancel or refuse any order at our discretion.</p>
              </div>

              <div>
                <h3 className="text-xl text-[#6b7c5b] font-semibold mb-2 mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>5. Intellectual Property</h3>
                <p>All website content including text, images, logos, graphics, and product information is the property of Absolute Ayur and may not be copied or reused without permission.</p>
              </div>

              <div>
                <h3 className="text-xl text-[#6b7c5b] font-semibold mb-2 mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>6. Limitation of Liability</h3>
                <p>Absolute Ayur shall not be held liable for any direct or indirect damages arising from the use of this website or its products.</p>
              </div>

              <div>
                <h3 className="text-xl text-[#6b7c5b] font-semibold mb-2 mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>7. Changes to Terms</h3>
                <p>We may update these terms at any time without prior notice. Continued use of the website constitutes acceptance of the revised terms.</p>
              </div>

              <div>
                <h3 className="text-xl text-[#6b7c5b] font-semibold mb-2 mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>8. Governing Law</h3>
                <p>These terms shall be governed by the laws of India.</p>
              </div>
            </div>
          </div>

          {/* Privacy Policy Card */}
          <div className="bg-white p-8 md:p-12 shadow-sm rounded-2xl border border-[rgba(201,183,156,0.3)] mt-8">
            <h2 
              className="text-3xl md:text-4xl text-[#6b7c5b] text-center mb-8 pb-6 border-b border-[#F7F5F0]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              PRIVACY POLICY
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6 font-['Lato'] leading-relaxed">
              <p className="font-semibold text-lg text-[#1A1A1A]">Absolute Ayur values and respects your privacy.</p>

              <div>
                <h3 className="text-xl text-[#6b7c5b] font-semibold mb-2 mt-8" style={{ fontFamily: "'Playfair Display', serif" }}>1. Information We Collect</h3>
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
                <h3 className="text-xl text-[#6b7c5b] font-semibold mb-2 mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>2. How We Use Information</h3>
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
                <h3 className="text-xl text-[#6b7c5b] font-semibold mb-2 mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>3. Data Protection</h3>
                <p>We take reasonable measures to protect user information from unauthorized access or misuse.</p>
              </div>

              <div>
                <h3 className="text-xl text-[#6b7c5b] font-semibold mb-2 mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>4. Cookies</h3>
                <p>Our website may use cookies and analytics tools to improve user experience and website performance.</p>
              </div>

              <div>
                <h3 className="text-xl text-[#6b7c5b] font-semibold mb-2 mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>5. Third-Party Services</h3>
                <p>We may use trusted third-party services such as payment gateways, analytics providers, and delivery partners. These services may have their own privacy policies.</p>
              </div>

              <div>
                <h3 className="text-xl text-[#6b7c5b] font-semibold mb-2 mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>6. User Rights</h3>
                <p>Users may request correction or deletion of their personal information by contacting us.</p>
              </div>

              <div>
                <h3 className="text-xl text-[#6b7c5b] font-semibold mb-2 mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>7. Policy Updates</h3>
                <p>This privacy policy may be updated periodically without prior notice.</p>
              </div>

              <div>
                <h3 className="text-xl text-[#6b7c5b] font-semibold mb-2 mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>8. Contact</h3>
                <p>For privacy-related concerns, users may contact us through the official website:<br/>
                  <a href="http://www.absoluteayur.com/" className="text-[#C9B79C] hover:text-[#6b7c5b] transition-colors duration-300">http://www.absoluteayur.com/</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
