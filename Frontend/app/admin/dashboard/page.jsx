"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUsers, FiImage, FiBook, FiBox, FiCalendar, FiDownload, FiChevronDown } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Preloader from "@/components/Preloader";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export default function DashboardOverview() {
  const [reportType, setReportType] = useState("Daily");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const [rawData, setRawData] = useState({
    doctors: [],
    gallery: [],
    courses: [],
    packages: [],
    consultations: []
  });

  const dashboardRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [doctorsRes, galleryRes, coursesRes, packagesRes, consultationsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/specialists/`).catch(() => ({ json: () => [] })),
          fetch(`${API_BASE_URL}/gallery/`).catch(() => ({ json: () => [] })),
          fetch(`${API_BASE_URL}/courses/`).catch(() => ({ json: () => [] })),
          fetch(`${API_BASE_URL}/packages/`).catch(() => ({ json: () => [] })),
          fetch(`${API_BASE_URL}/consultations/`).catch(() => ({ json: () => [] }))
        ]);

        setRawData({
          doctors: await doctorsRes.json(),
          gallery: await galleryRes.json(),
          courses: await coursesRes.json(),
          packages: await packagesRes.json(),
          consultations: await consultationsRes.json()
        });

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getFilteredConsultations = () => {
    const now = new Date();

    return rawData.consultations.filter(c => {
      if (!c.created_at) return false;
      const cDate = new Date(c.created_at);

      if (reportType === "Daily") {
        return cDate.toDateString() === now.toDateString();
      }
      else if (reportType === "Weekly") {
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return cDate >= sevenDaysAgo;
      }
      else if (reportType === "Monthly") {
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return cDate >= thirtyDaysAgo;
      }
      return true;
    });
  };

  const filteredConsultations = getFilteredConsultations();
  const pendingFilteredCount = filteredConsultations.filter(c => c.status === 'pending').length;

  const dynamicStats = [
    { title: "Total Doctors",            count: rawData.doctors.length || 0,  icon: FiUsers,    color: "bg-blue-100 text-blue-600"   },
    { title: "Gallery Images",           count: rawData.gallery.length || 0,  icon: FiImage,    color: "bg-pink-100 text-pink-600"   },
    { title: "Active Courses",           count: rawData.courses.length || 0,  icon: FiBook,     color: "bg-green-100 text-green-600" },
    { title: "Packages",                 count: rawData.packages.length || 0, icon: FiBox,      color: "bg-purple-100 text-purple-600" },
    { title: `New Requests (${reportType})`, count: pendingFilteredCount,     icon: FiCalendar, color: "bg-yellow-100 text-yellow-600" },
  ];

  const getDynamicChartData = () => {
    if (reportType === "Daily") {
      const days = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return {
          dateString: d.toISOString().split('T')[0],
          name: d.toLocaleDateString('en-US', { weekday: 'short' }),
          consultations: 0
        };
      });

      rawData.consultations.forEach(c => {
        if (!c.created_at) return;
        const cDate = new Date(c.created_at).toISOString().split('T')[0];
        const dayMatch = days.find(d => d.dateString === cDate);
        if (dayMatch) dayMatch.consultations++;
      });
      return days;
    }

    if (reportType === "Weekly") {
      const weeks = Array.from({ length: 4 }).map((_, i) => ({
        name: `Week ${4 - i}`,
        start: new Date(new Date().setDate(new Date().getDate() - (7 * (4 - i)))),
        end:   new Date(new Date().setDate(new Date().getDate() - (7 * (3 - i)))),
        consultations: 0
      }));

      rawData.consultations.forEach(c => {
        if (!c.created_at) return;
        const cDate = new Date(c.created_at);
        const weekMatch = weeks.find(w => cDate >= w.start && cDate < w.end);
        if (weekMatch) weekMatch.consultations++;
      });
      return weeks;
    }

    if (reportType === "Monthly") {
      const months = Array.from({ length: 6 }).map((_, i) => {
        const d = new Date();
        d.setMonth(d.getMonth() - (5 - i));
        return {
          month: d.getMonth(),
          year:  d.getFullYear(),
          name:  d.toLocaleDateString('en-US', { month: 'short' }),
          consultations: 0
        };
      });

      rawData.consultations.forEach(c => {
        if (!c.created_at) return;
        const cDate = new Date(c.created_at);
        const monthMatch = months.find(m => m.month === cDate.getMonth() && m.year === cDate.getFullYear());
        if (monthMatch) monthMatch.consultations++;
      });
      return months;
    }

    return [];
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    setShowDropdown(false);

    setTimeout(async () => {
      try {
        const element = dashboardRef.current;
        const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: "#F7F5F0" });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Absolute_Ayurveda_${reportType}_Report.pdf`);
      } catch (error) {
        console.error("Error generating PDF:", error);
      } finally {
        setIsDownloading(false);
      }
    }, 300);
  };

  // Removed the early return for isLoading so we can mount Preloader and keep AnimatePresence working.
  return (
    <>
      <Preloader isLoading={isLoading} isFullPage={false} />
      {!isLoading && (
        <div ref={dashboardRef} className="pb-10 bg-cream p-4 rounded-xl">
          <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-playfair text-text mb-2">Dashboard Overview</h1>
            <p className="text-text-muted font-lato">Welcome to the Absolute Ayurveda admin panel.</p>
          </div>

          {/* Download Dropdown */}
          <div className="relative" data-html2canvas-ignore>
            <div className="flex bg-white border border-border rounded-lg shadow-sm cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
              <div className="px-4 py-2 border-r border-border text-sm font-medium text-text bg-gray-50 flex items-center">
                <FiDownload className="mr-2" /> Report: {reportType}
              </div>
              <button
                disabled={isDownloading}
                className="px-3 py-2 flex items-center hover:bg-gray-50 transition-colors"
              >
                <span className="sr-only">Toggle Dropdown</span>
                <FiChevronDown />
              </button>
            </div>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border overflow-hidden z-10"
                >
                  {["Daily", "Weekly", "Monthly"].map((type) => (
                    <button
                      key={type}
                      onClick={() => { setReportType(type); setShowDropdown(false); }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${reportType === type ? "bg-olive/10 text-[#6b7c5b] font-semibold" : "hover:bg-gray-50 text-text"}`}
                    >
                      {type} Report
                    </button>
                  ))}
                  <div className="border-t border-border p-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDownloadPDF(); }}
                      disabled={isDownloading}
                      className="w-full bg-[#6b7c5b] text-white py-2 rounded-md text-sm font-medium hover:bg-[#4a5740] transition-colors flex justify-center items-center"
                    >
                      {isDownloading ? "Generating..." : "Download PDF"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {dynamicStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-border flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className={`p-4 rounded-lg ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text">{stat.count}</h3>
                  <p className="text-text-muted text-sm font-lato">{stat.title}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Chart */}
        <div className="w-full mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-border"
          >
            <h3 className="text-xl font-playfair font-bold text-text mb-6">
              Consultations Overview ({reportType})
            </h3>
            <div className="h-96">
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getDynamicChartData()} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#888" fontSize={12} />
                    <YAxis stroke="#888" fontSize={12} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="consultations"
                      stroke="#D4AF37"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Consultations"
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </motion.div>
        </div>

      </motion.div>
    </div>
      )}
    </>
  );
}