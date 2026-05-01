"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { FiMenu, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";

export default function DashboardWrapper({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <motion.div 
        initial={false}
        animate={{ marginLeft: isCollapsed ? 80 : 256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex-1 flex flex-col min-h-screen overflow-hidden"
      >
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

          <div>
            <div className="p-2 rounded-full bg-olive/10 text-olive">
              <FiUser size={24} />
            </div>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-y-auto h-[calc(100vh-73px)]">
          <main className="max-w-7xl mx-auto">
            {children}
          </main>
        </div>
      </motion.div>
    </div>
  );
}
