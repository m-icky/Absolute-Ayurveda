"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("aa_access");

    // 1. If they are exactly on the login page (/admin)
    if (pathname === "/admin") {
      if (token) {
        router.push("/admin/dashboard");
      } else {
        setIsAuthorized(true);
      }
      return;
    }

    // 2. If they are anywhere else in the dashboard
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