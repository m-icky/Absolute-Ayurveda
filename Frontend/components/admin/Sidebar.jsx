"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FiHome, 
  FiUsers, 
  FiImage, 
  FiBook, 
  FiBox, 
  FiCalendar, 
  FiLogOut 
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar({ isCollapsed }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/admin/dashboard", icon: FiHome },
    { name: "Doctors", href: "/admin/dashboard/doctors", icon: FiUsers },
    { name: "Gallery", href: "/admin/dashboard/gallery", icon: FiImage },
    { name: "Courses", href: "/admin/dashboard/courses", icon: FiBook },
    { name: "Packages", href: "/admin/dashboard/packages", icon: FiBox },
    { name: "Consultations", href: "/admin/dashboard/consultations", icon: FiCalendar },
  ];

  return (
    <motion.div 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen bg-olive text-cream fixed left-0 top-0 flex flex-col shadow-xl z-50 overflow-hidden"
    >
      {/* Branding */}
      <div className="p-6 flex flex-col items-center border-b border-olive-dark h-24 justify-center">
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div 
              key="full-title"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="font-playfair text-2xl tracking-wide whitespace-nowrap font-bold">Admin Panel</h2>
            </motion.div>
          ) : (
            <motion.div
              key="icon-title"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
               <div className="w-10 h-10 bg-black/30 rounded-lg flex items-center justify-center font-playfair font-bold text-xl drop-shadow-md border border-white/10">A</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 overflow-x-hidden">
        <ul className="space-y-2 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link href={item.href} className="block relative">
                  <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-lg transition-all duration-300 z-10 relative ${
                    isActive ? "text-olive-dark font-semibold" : "text-cream/80 hover:text-white hover:bg-olive-dark/50"
                  }`}>
                    <Icon size={22} className="shrink-0" />
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span 
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="font-lato whitespace-nowrap overflow-hidden"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-gold rounded-lg z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>


      {/* Logout */}
      <div className="p-4 border-t border-olive-dark">
        <Link href="/admin" className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-lg text-cream/80 hover:text-red-400 hover:bg-olive-dark/50 transition-colors relative`}>
          <FiLogOut size={22} className="shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-lato whitespace-nowrap overflow-hidden"
              >
                Log Out
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>
    </motion.div>
  );
}
