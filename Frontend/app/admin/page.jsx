"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import HomeBg from "../../assets/ayurveda-hero1.png";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "password") {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials. Use admin / password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl"
        style={{ minHeight: "600px" }}
      >
        {/* Left Side - Image & Branding */}
        <div className="md:w-1/2 relative hidden md:block">
          <img
            src={HomeBg.src || HomeBg}
            alt="Ayurveda Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-olive/60 bg-gradient-to-t from-olive-dark/80 to-transparent"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-center items-center p-12 text-center text-white">
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              src="/absoluteayur.png"
              alt="Logo"
              className="w-48 mb-8 drop-shadow-lg"
            />
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl font-playfair mb-4"
            >
              Admin Portal
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-white/80 font-lato"
            >
              Secure access to manage Absolute Ayurveda content.
            </motion.p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
          {/* Mobile Logo */}
          <div className="md:hidden flex justify-center mb-8">
            <img src="/absoluteayur.png" alt="Logo" className="w-32" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h2 className="text-3xl font-playfair text-text font-bold mb-2">Welcome Back</h2>
            <p className="text-text-muted font-lato mb-8">Please enter your details to sign in.</p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2 font-lato">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border focus:border-olive focus:ring-1 focus:ring-olive outline-none transition-all font-lato bg-cream/30"
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-2 font-lato">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border focus:border-olive focus:ring-1 focus:ring-olive outline-none transition-all font-lato bg-cream/30"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm font-lato">{error}</p>}

              <button
                type="submit"
                className="w-full bg-olive hover:bg-olive-dark text-white font-lato font-semibold py-3 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Log In
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
