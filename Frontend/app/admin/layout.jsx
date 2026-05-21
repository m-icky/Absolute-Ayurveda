"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("aa_access");

    // 1. Public paths that don't require authentication
    const publicPaths = ["/admin", "/admin/reset-password", "/admin/setup"];
    
    if (publicPaths.includes(pathname)) {
      if (token && pathname === "/admin") {
        router.push("/admin/dashboard");
      } else {
        setIsAuthorized(true);
      }
      return;
    }

    // 2. If they are anywhere else in the admin section
    if (!token) {
      router.push("/admin"); 
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  if (!isAuthorized) {
    return <div className="min-h-screen bg-cream flex items-center justify-center text-olive font-lato font-bold text-xl">Securing Portal...</div>;
  }

  return <>{children}</>;
}