"use client";

import { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import { FiMenu, FiUser, FiX, FiEdit2, FiCheck, FiMail, FiPhone, FiAtSign, FiLogOut, FiLock } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { authHeaders, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DashboardWrapper({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profile,     setProfile]     = useState(null);
  const [isEditing,   setIsEditing]   = useState(false);
  const [formData,    setFormData]    = useState({});
  const [saving,      setSaving]      = useState(false);
  const [saveMsg,     setSaveMsg]     = useState("");
  const [saveError,   setSaveError]   = useState("");

  const panelRef = useRef(null);
  const router   = useRouter();

  // Fetch profile when panel opens
  useEffect(() => {
    if (!showProfile || profile) return;

    const fetchProfile = async () => {
      try {
        const res  = await fetch(`${API_BASE_URL}/auth/profile/`, { headers: authHeaders() });
        if (res.status === 401) { logout(router); return; }
        const data = await res.json();
        setProfile(data);
        setFormData(data);
      } catch {
        console.error("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, [showProfile]);

  // Close panel on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setShowProfile(false);
        setIsEditing(false);
      }
    };
    if (showProfile) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showProfile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSaveError("");
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg("");
    setSaveError("");

    try {
      const res  = await fetch(`${API_BASE_URL}/auth/profile/`, {
        method:  "PUT",
        headers: authHeaders(),
        body:    JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setSaveError(data.error || "Failed to update.");
        return;
      }

      setProfile(formData);
      setIsEditing(false);
      setSaveMsg("Profile updated successfully.");
      setTimeout(() => setSaveMsg(""), 3000);

    } catch {
      setSaveError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
    setSaveError("");
  };

  const getInitials = () => {
    if (!profile) return "A";
    const f = profile.first_name?.[0] || "";
    const l = profile.last_name?.[0]  || "";
    return (f + l).toUpperCase() || profile.username?.[0]?.toUpperCase() || "A";
  };

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <motion.div
        initial={false}
        animate={{ marginLeft: isCollapsed ? 80 : 256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex-1 flex flex-col min-h-screen overflow-hidden"
      >
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-border p-4 flex items-center justify-between shrink-0 z-40 sticky top-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg text-olive hover:bg-olive/10 hover:text-olive-dark transition-colors"
            >
              <FiMenu size={26} />
            </button>
            <img src="/absoluteayur.png" alt="Logo" className="h-10 drop-shadow-sm bg-olive/5 rounded-lg p-1" />
          </div>

          {/* Profile Button */}
          <button
            onClick={() => { setShowProfile(!showProfile); setIsEditing(false); setSaveMsg(""); setSaveError(""); }}
            className="p-2 rounded-full bg-olive/10 text-olive hover:bg-olive/20 transition-colors"
          >
            <FiUser size={24} />
          </button>
        </header>

        <div className="flex-1 p-8 overflow-y-auto h-[calc(100vh-73px)]">
          <main className="max-w-7xl mx-auto">
            {children}
          </main>
        </div>
      </motion.div>

      {/* Profile Side Panel */}
      <AnimatePresence>
        {showProfile && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            />

            {/* Panel */}
            <motion.div
              ref={panelRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Panel Header */}
              <div className="bg-olive p-6 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white font-playfair text-xl font-bold">
                    {getInitials()}
                  </div>
                  <div>
                    <p className="text-white font-playfair text-lg font-bold leading-tight">
                      {profile ? `${profile.first_name} ${profile.last_name}`.trim() || profile.username : "Admin"}
                    </p>
                    <p className="text-white/70 text-xs font-lato mt-0.5">Superuser</p>
                  </div>
                </div>
                <button
                  onClick={() => { setShowProfile(false); setIsEditing(false); }}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <FiX size={22} />
                </button>
              </div>

              {/* Panel Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">

                {/* Success message */}
                <AnimatePresence>
                  {saveMsg && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-green-700 text-sm font-lato bg-green-50 border border-green-200 rounded-lg px-4 py-2 flex items-center gap-2"
                    >
                      <FiCheck size={14} /> {saveMsg}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Error message */}
                {saveError && (
                  <p className="text-red-500 text-sm font-lato bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                    {saveError}
                  </p>
                )}

                {profile ? (
                  <>
                    {/* First Name */}
                    <div>
                      <label className="block text-xs font-medium text-text-muted font-lato mb-1.5 uppercase tracking-wide">
                        First Name
                      </label>
                      {isEditing ? (
                        <input
                          name="first_name"
                          value={formData.first_name || ""}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-border focus:border-olive focus:ring-1 focus:ring-olive outline-none font-lato text-sm bg-cream/30"
                          placeholder="First name"
                        />
                      ) : (
                        <p className="font-lato text-text text-sm px-4 py-2.5 bg-cream/30 rounded-lg border border-border/50">
                          {profile.first_name || <span className="text-text-muted italic">Not set</span>}
                        </p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-xs font-medium text-text-muted font-lato mb-1.5 uppercase tracking-wide">
                        Last Name
                      </label>
                      {isEditing ? (
                        <input
                          name="last_name"
                          value={formData.last_name || ""}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-border focus:border-olive focus:ring-1 focus:ring-olive outline-none font-lato text-sm bg-cream/30"
                          placeholder="Last name"
                        />
                      ) : (
                        <p className="font-lato text-text text-sm px-4 py-2.5 bg-cream/30 rounded-lg border border-border/50">
                          {profile.last_name || <span className="text-text-muted italic">Not set</span>}
                        </p>
                      )}
                    </div>

                    {/* Username */}
                    <div>
                      <label className="block text-xs font-medium text-text-muted font-lato mb-1.5 uppercase tracking-wide flex items-center gap-1">
                        <FiAtSign size={11} /> Username
                      </label>
                      {isEditing ? (
                        <input
                          name="username"
                          value={formData.username || ""}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-border focus:border-olive focus:ring-1 focus:ring-olive outline-none font-lato text-sm bg-cream/30"
                          placeholder="Username"
                        />
                      ) : (
                        <p className="font-lato text-text text-sm px-4 py-2.5 bg-cream/30 rounded-lg border border-border/50">
                          {profile.username}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-text-muted font-lato mb-1.5 uppercase tracking-wide flex items-center gap-1">
                        <FiMail size={11} /> Email
                      </label>
                      {isEditing ? (
                        <input
                          name="email"
                          type="email"
                          value={formData.email || ""}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-border focus:border-olive focus:ring-1 focus:ring-olive outline-none font-lato text-sm bg-cream/30"
                          placeholder="Email address"
                        />
                      ) : (
                        <p className="font-lato text-text text-sm px-4 py-2.5 bg-cream/30 rounded-lg border border-border/50">
                          {profile.email || <span className="text-text-muted italic">Not set</span>}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-medium text-text-muted font-lato mb-1.5 uppercase tracking-wide flex items-center gap-1">
                        <FiPhone size={11} /> Phone
                      </label>
                      {isEditing ? (
                        <input
                          name="phone"
                          value={formData.phone || ""}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-border focus:border-olive focus:ring-1 focus:ring-olive outline-none font-lato text-sm bg-cream/30"
                          placeholder="Phone number"
                        />
                      ) : (
                        <p className="font-lato text-text text-sm px-4 py-2.5 bg-cream/30 rounded-lg border border-border/50">
                          {profile.phone || <span className="text-text-muted italic">Not set</span>}
                        </p>
                      )}
                    </div>

                    {/* Edit / Save buttons */}
                    {isEditing ? (
                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={handleCancel}
                          className="flex-1 py-2.5 rounded-lg border border-border text-text-muted font-lato text-sm hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={saving}
                          className="flex-1 bg-olive hover:bg-olive-dark text-white font-lato text-sm font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60"
                        >
                          {saving ? "Saving…" : "Save Changes"}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-olive text-olive hover:bg-olive/5 font-lato text-sm font-medium transition-colors"
                      >
                        <FiEdit2 size={15} /> Edit Profile
                      </button>
                    )}
                  </>
                ) : (
                  <div className="text-center text-text-muted font-lato text-sm py-8">
                    Loading profile…
                  </div>
                )}
              </div>

              {/* Panel Footer */}
              <div className="shrink-0 border-t border-border p-4 space-y-2">
                <button
                  onClick={() => { setShowProfile(false); router.push("/admin/change-password"); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-text-muted hover:bg-cream hover:text-text font-lato text-sm transition-colors"
                >
                  <FiLock size={16} /> Change Password
                </button>
                <button
                  onClick={() => logout(router)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-500 hover:bg-red-50 font-lato text-sm transition-colors"
                >
                  <FiLogOut size={16} /> Log Out
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}