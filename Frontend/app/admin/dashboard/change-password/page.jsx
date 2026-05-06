"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiLock, FiEye, FiEyeOff, FiArrowLeft, FiCheck } from "react-icons/fi";
import { getAccessToken, logout } from "@/lib/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ChangePasswordPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [show, setShow] = useState({
    current_password: false,
    new_password: false,
    confirm_password: false,
  });

  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const toggleShow = (field) => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Password strength
  const getStrength = (pwd) => {
    if (!pwd) return { label: "", color: "", width: "0%" };
    if (pwd.length < 6)  return { label: "Weak",   color: "bg-red-400",    width: "33%" };
    if (pwd.length < 10) return { label: "Medium", color: "bg-yellow-400", width: "66%" };
    return                      { label: "Strong", color: "bg-green-500",  width: "100%" };
  };

  const strength = getStrength(form.new_password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.new_password !== form.confirm_password) {
      setError("New passwords do not match.");
      return;
    }

    if (form.new_password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/change-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setSuccess("Password changed successfully. Please log in again.");
      setForm({ current_password: "", new_password: "", confirm_password: "" });

      // Token is now invalid after password change — log out after 2 seconds
      setTimeout(() => logout(router), 2000);

    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream p-4 sm:p-8 flex items-start justify-center">
      <div className="w-full max-w-lg">

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-text-muted hover:text-text font-lato text-sm mb-6 transition-colors"
        >
          <FiArrowLeft /> Back to Dashboard
        </button>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-sm border border-border p-8"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-olive/10 rounded-xl">
              <FiLock size={24} className="text-olive" />
            </div>
            <div>
              <h1 className="text-2xl font-playfair text-text font-bold">Change Password</h1>
              <p className="text-text-muted text-sm font-lato">Update your admin account password</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2 font-lato">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={show.current_password ? "text" : "password"}
                  name="current_password"
                  value={form.current_password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-11 rounded-lg border border-border focus:border-olive focus:ring-1 focus:ring-olive outline-none transition-all font-lato bg-cream/30"
                  placeholder="Enter current password"
                  required
                />
                <button
                  type="button"
                  onClick={() => toggleShow("current_password")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
                >
                  {show.current_password ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2 font-lato">
                New Password
              </label>
              <div className="relative">
                <input
                  type={show.new_password ? "text" : "password"}
                  name="new_password"
                  value={form.new_password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-11 rounded-lg border border-border focus:border-olive focus:ring-1 focus:ring-olive outline-none transition-all font-lato bg-cream/30"
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => toggleShow("new_password")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
                >
                  {show.new_password ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>

              {/* Strength bar */}
              {form.new_password && (
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
              <label className="block text-sm font-medium text-text-muted mb-2 font-lato">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={show.confirm_password ? "text" : "password"}
                  name="confirm_password"
                  value={form.confirm_password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-11 rounded-lg border border-border focus:border-olive focus:ring-1 focus:ring-olive outline-none transition-all font-lato bg-cream/30"
                  placeholder="Confirm new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => toggleShow("confirm_password")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
                >
                  {show.confirm_password ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>

                {/* Match indicator */}
                {form.confirm_password && (
                  <div className="absolute right-10 top-1/2 -translate-y-1/2">
                    {form.new_password === form.confirm_password
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

            {/* Success */}
            {success && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-600 text-sm font-lato bg-green-50 border border-green-200 rounded-lg px-4 py-2 flex items-center gap-2"
              >
                <FiCheck /> {success}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-olive hover:bg-olive-dark text-white font-lato font-semibold py-3 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Updating…
                </span>
              ) : "Update Password"}
            </button>

          </form>
        </motion.div>
      </div>
    </div>
  );
}