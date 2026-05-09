"use client";

import { useState, useEffect } from "react";
import { useRouter, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff, FiCheck, FiLock } from "react-icons/fi";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SetupPage() {
  notFound();
  return null;
}

// Disconnected old setup page code:
function OldSetupPage() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [allowed,  setAllowed]  = useState(false);

  const [form, setForm] = useState({
    username:         "",
    email:            "",
    password:         "",
    confirm_password: "",
  });

  const [show, setShow] = useState({
    password:         false,
    confirm_password: false,
  });

  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if setup is still required
  useEffect(() => {
    const check = async () => {
      try {
        const res  = await fetch(`${API_BASE_URL}/auth/setup/`);
        const data = await res.json();

        if (!data.setup_required) {
          // Already set up — redirect to login
          router.replace("/admin");
          return;
        }

        setAllowed(true);
      } catch {
        setError("Cannot connect to server.");
      } finally {
        setChecking(false);
      }
    };

    check();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const getStrength = (pwd) => {
    if (!pwd) return { label: "", color: "", width: "0%" };
    if (pwd.length < 6)  return { label: "Weak",   color: "bg-red-400",    width: "33%" };
    if (pwd.length < 10) return { label: "Medium", color: "bg-yellow-400", width: "66%" };
    return                      { label: "Strong", color: "bg-green-500",  width: "100%" };
  };

  const strength = getStrength(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const res  = await fetch(`${API_BASE_URL}/auth/setup/`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setSuccess(data.success);
      setTimeout(() => router.push("/admin"), 2500);

    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Loading check ──────────────────────────────────────────────────────
  if (checking) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="font-lato text-text-muted">Checking setup status…</p>
      </div>
    );
  }

  if (!allowed) return null;

  // ── Setup Form ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <img src="/absoluteayur.png" alt="Logo" className="w-24 mx-auto mb-4" />
          <h1 className="text-3xl font-playfair text-text font-bold mb-2">
            Welcome to Absolute Ayurveda
          </h1>
          <p className="text-text-muted font-lato text-sm">
            Create your admin account to get started.
            <br />
            <span className="text-olive font-medium">This page will be disabled after setup.</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-border p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-olive/10 rounded-xl">
              <FiLock size={20} className="text-olive" />
            </div>
            <div>
              <h2 className="text-lg font-playfair text-text font-bold">Create Admin Account</h2>
              <p className="text-text-muted text-xs font-lato">One-time setup</p>
            </div>
          </div>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4 py-4"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <FiCheck size={28} className="text-green-500" />
              </div>
              <p className="text-green-700 font-lato text-sm bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                {success}
              </p>
              <p className="text-text-muted font-lato text-xs">Redirecting to login…</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2 font-lato">Username</label>
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border focus:border-olive focus:ring-1 focus:ring-olive outline-none transition-all font-lato bg-cream/30"
                  placeholder="admin"
                  autoComplete="username"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2 font-lato">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border focus:border-olive focus:ring-1 focus:ring-olive outline-none transition-all font-lato bg-cream/30"
                  placeholder="admin@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2 font-lato">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={show.password ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-11 rounded-lg border border-border focus:border-olive focus:ring-1 focus:ring-olive outline-none transition-all font-lato bg-cream/30"
                    placeholder="Min. 8 characters"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShow(p => ({ ...p, password: !p.password }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
                  >
                    {show.password ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>

                {/* Strength bar */}
                {form.password && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: strength.width }}
                        transition={{ duration: 0.3 }}
                        className={`h-1.5 rounded-full ${strength.color}`}
                      />
                    </div>
                    <p className="text-xs text-text-muted font-lato mt-1">
                      Strength: <span className="font-medium">{strength.label}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2 font-lato">Confirm Password</label>
                <div className="relative">
                  <input
                    name="confirm_password"
                    type={show.confirm_password ? "text" : "password"}
                    value={form.confirm_password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-11 rounded-lg border border-border focus:border-olive focus:ring-1 focus:ring-olive outline-none transition-all font-lato bg-cream/30"
                    placeholder="Repeat password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShow(p => ({ ...p, confirm_password: !p.confirm_password }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
                  >
                    {show.confirm_password ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>

                  {form.confirm_password && (
                    <div className="absolute right-10 top-1/2 -translate-y-1/2">
                      {form.password === form.confirm_password
                        ? <FiCheck size={16} className="text-green-500" />
                        : <span className="text-red-400 text-xs">✕</span>
                      }
                    </div>
                  )}
                </div>
              </div>

              {/* Error */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm font-lato bg-red-50 border border-red-200 rounded-lg px-4 py-2"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-olive hover:bg-olive-dark text-white font-lato font-semibold py-3 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Creating account…
                  </span>
                ) : "Create Admin Account"}
              </button>

            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}