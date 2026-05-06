"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import HomeBg from "../../assets/ayurveda-hero1.png";
import { loginRequest, saveTokens } from "@/lib/auth";
import Preloader from "@/components/Preloader";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Forgot password modal
  const [showForgot,      setShowForgot]      = useState(false);
  const [forgotEmail,     setForgotEmail]     = useState("");
  const [forgotLoading,   setForgotLoading]   = useState(false);
  const [forgotError,     setForgotError]     = useState("");
  const [forgotSuccess,   setForgotSuccess]   = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginRequest(username, password);
      saveTokens(data);
      setLoginSuccess(true);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotError("");
    setForgotSuccess("");
    setForgotLoading(true);

    try {
      const res  = await fetch(`${API_BASE_URL}/auth/forgot-password/`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();

      if (!res.ok) {
        setForgotError(data.error || "Something went wrong.");
      } else {
        setForgotSuccess(data.success);
        setForgotEmail("");
      }
    } catch {
      setForgotError("Network error. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  const closeForgot = () => {
    setShowForgot(false);
    setForgotEmail("");
    setForgotError("");
    setForgotSuccess("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-4 sm:p-8">
      {loginSuccess && <Preloader isLoading={true} />}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl"
        style={{ minHeight: "600px" }}
      >
        {/* Left Side */}
        <div className="md:w-1/2 relative hidden md:block">
          <img src={HomeBg.src || HomeBg} alt="Ayurveda Background" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-olive/60 bg-gradient-to-t from-olive-dark/80 to-transparent" />
          <div className="relative z-10 h-full flex flex-col justify-center items-center p-12 text-center text-white">
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
              src="/absoluteayur.png" alt="Logo" className="w-48 mb-8 drop-shadow-lg"
            />
            <motion.h1
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl font-playfair mb-4"
            >Admin Portal</motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }}
              className="text-white/80 font-lato"
            >Secure access to manage Absolute Ayurveda content.</motion.p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
          <Link href="/" className="absolute top-6 right-6 sm:top-8 sm:right-8 flex items-center gap-2 text-sm font-lato text-text-muted hover:text-olive transition-colors">
            <FiArrowLeft size={16} /> Back to Site
          </Link>

          <div className="md:hidden flex justify-center mb-8">
            <img src="/absoluteayur.png" alt="Logo" className="w-32" />
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
            <h2 className="text-3xl font-playfair text-text font-bold mb-2">Welcome Back</h2>
            <p className="text-text-muted font-lato mb-8">Please enter your details to sign in.</p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2 font-lato">Username</label>
                <input
                  type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border focus:border-olive focus:ring-1 focus:ring-olive outline-none transition-all font-lato bg-cream/30"
                  placeholder="Enter your username" autoComplete="username" required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-text-muted font-lato">Password</label>
                  <button
                    type="button"
                    onClick={() => setShowForgot(true)}
                    className="text-xs text-olive hover:text-olive-dark font-lato underline underline-offset-2 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-11 rounded-lg border border-border focus:border-olive focus:ring-1 focus:ring-olive outline-none transition-all font-lato bg-cream/30"
                    placeholder="••••••••" autoComplete="current-password" required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm font-lato bg-red-50 border border-red-200 rounded-lg px-4 py-2"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit" disabled={loading}
                className="w-full bg-olive hover:bg-olive-dark text-white font-lato font-semibold py-3 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Signing in…
                  </span>
                ) : "Log In"}
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeForgot}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-playfair font-bold text-text mb-2">Forgot Password</h3>
              <p className="text-text-muted font-lato text-sm mb-6">
                Enter the email linked to your admin account. We'll send you a reset link.
              </p>

              {!forgotSuccess ? (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-2 font-lato">Email Address</label>
                    <input
                      type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-border focus:border-olive focus:ring-1 focus:ring-olive outline-none transition-all font-lato bg-cream/30"
                      placeholder="admin@example.com" required
                    />
                  </div>

                  {forgotError && (
                    <p className="text-red-500 text-sm font-lato bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                      {forgotError}
                    </p>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button" onClick={closeForgot}
                      className="flex-1 py-3 rounded-lg border border-border text-text-muted font-lato font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit" disabled={forgotLoading}
                      className="flex-1 bg-olive hover:bg-olive-dark text-white font-lato font-semibold py-3 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {forgotLoading ? "Sending…" : "Send Reset Link"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-green-700 font-lato text-sm bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                    {forgotSuccess}
                  </p>
                  <button
                    onClick={closeForgot}
                    className="w-full bg-olive hover:bg-olive-dark text-white font-lato font-semibold py-3 rounded-lg transition-colors"
                  >
                    Back to Login
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}