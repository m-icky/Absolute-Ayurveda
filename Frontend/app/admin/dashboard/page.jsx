"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUsers, FiImage, FiBook, FiBox, FiCalendar, FiDownload, FiChevronDown } from "react-icons/fi";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const dailyData = [
  { name: "Mon", consultations: 4, revenue: 2000 },
  { name: "Tue", consultations: 3, revenue: 1500 },
  { name: "Wed", consultations: 7, revenue: 3500 },
  { name: "Thu", consultations: 5, revenue: 2500 },
  { name: "Fri", consultations: 8, revenue: 4000 },
  { name: "Sat", consultations: 12, revenue: 6000 },
  { name: "Sun", consultations: 10, revenue: 5000 },
];

const weeklyData = [
  { name: "Week 1", consultations: 25, revenue: 12500 },
  { name: "Week 2", consultations: 32, revenue: 16000 },
  { name: "Week 3", consultations: 28, revenue: 14000 },
  { name: "Week 4", consultations: 35, revenue: 17500 },
];

const monthlyData = [
  { name: "Jan", consultations: 120, revenue: 60000 },
  { name: "Feb", consultations: 145, revenue: 72500 },
  { name: "Mar", consultations: 130, revenue: 65000 },
  { name: "Apr", consultations: 160, revenue: 80000 },
  { name: "May", consultations: 150, revenue: 75000 },
  { name: "Jun", consultations: 180, revenue: 90000 },
];

export default function DashboardOverview() {
  const [reportType, setReportType] = useState("Daily");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const dashboardRef = useRef(null);

  const stats = [
    { title: "Total Doctors", count: 12, icon: FiUsers, color: "bg-blue-100 text-blue-600" },
    { title: "Gallery Images", count: 45, icon: FiImage, color: "bg-pink-100 text-pink-600" },
    { title: "Active Courses", count: 8, icon: FiBook, color: "bg-green-100 text-green-600" },
    { title: "Packages", count: 15, icon: FiBox, color: "bg-purple-100 text-purple-600" },
    { title: "New Consultations", count: 24, icon: FiCalendar, color: "bg-yellow-100 text-yellow-600" },
  ];

  const getChartData = () => {
    switch(reportType) {
      case "Daily": return dailyData;
      case "Weekly": return weeklyData;
      case "Monthly": return monthlyData;
      default: return dailyData;
    }
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    setShowDropdown(false);
    
    // Slight delay to allow dropdown to animate out
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

  return (
    <div ref={dashboardRef} className="pb-10 bg-cream p-4 rounded-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-playfair text-text mb-2">Dashboard Overview</h1>
            <p className="text-text-muted font-lato">Welcome to the Absolute Ayurveda admin panel.</p>
          </div>
          
          {/* Download Dropdown */}
          <div className="relative" data-html2canvas-ignore>
            <div className="flex bg-white border border-border rounded-lg shadow-sm">
              <div className="px-4 py-2 border-r border-border text-sm font-medium text-text bg-gray-50 flex items-center">
                <FiDownload className="mr-2" /> Report: {reportType}
              </div>
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
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
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${reportType === type ? "bg-olive/10 text-olive-dark font-semibold" : "hover:bg-gray-50 text-text"}`}
                    >
                      {type} Report
                    </button>
                  ))}
                  <div className="border-t border-border p-2">
                    <button
                      onClick={handleDownloadPDF}
                      disabled={isDownloading}
                      className="w-full bg-olive text-white py-2 rounded-md text-sm font-medium hover:bg-olive-dark transition-colors flex justify-center items-center"
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
          {stats.map((stat, index) => {
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
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-border"
          >
            <h3 className="text-xl font-playfair font-bold text-text mb-6">Consultations Overview ({reportType})</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getChartData()} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="consultations" stroke="#D4AF37" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Consultations" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-border"
          >
            <h3 className="text-xl font-playfair font-bold text-text mb-6">Revenue & Packages ({reportType})</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getChartData()} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{ fill: 'transparent' }}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="#3A4D39" radius={[4, 4, 0, 0]} name="Revenue (₹)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
