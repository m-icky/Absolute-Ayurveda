"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiTrash2, FiEye, FiX, FiCalendar, FiUser, FiPhone, FiMail } from "react-icons/fi";
import { Popover } from "@mui/material";
import Preloader from "@/components/Preloader";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/consultations/`;

export default function ConsultationsManagement() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [deleteAnchorEl, setDeleteAnchorEl] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => { fetchConsultations(); }, []);

  const fetchConsultations = async () => {
    try {
      const token = sessionStorage.getItem("aa_access");
      const headers = token ? { "Authorization": `Bearer ${token}` } : {};
      
      const response = await fetch(API_BASE_URL, { headers });
      
      if (response.ok) {
        const data = await response.json();
        setConsultations(Array.isArray(data) ? data : []);
      }
    } catch (error) { 
      console.error("Failed to fetch consultations:", error); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const token = sessionStorage.getItem("aa_access");
      const response = await fetch(`${API_BASE_URL}${id}/`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus }), 
      });
      if (response.ok) {
        setConsultations(consultations.map(c => c.id === id ? { ...c, status: newStatus } : c));
        if (selectedConsultation?.id === id) {
           setSelectedConsultation({ ...selectedConsultation, status: newStatus });
        }
      }
    } catch (error) { console.error("Error updating status:", error); }
  };

  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem("aa_access");
      const response = await fetch(`${API_BASE_URL}${id}/`, { 
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` } 
      });
      if (response.ok) {
        setConsultations(consultations.filter(c => c.id !== id));
      }
    } catch (error) { console.error("Error deleting consultation:", error); }
  };

  const confirmDelete = () => {
    if (itemToDelete !== null) {
      handleDelete(itemToDelete);
      setDeleteAnchorEl(null);
      setItemToDelete(null);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <Preloader isLoading={loading} isFullPage={false} />
      {!loading && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-playfair text-text mb-2">Consultation Bookings</h1>
              <p className="text-text-muted font-lato">View and manage consultation requests from patients.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-cream/50 text-text-muted text-sm font-lato uppercase tracking-wider border-b border-border">
                    <th className="px-6 py-4 font-semibold">Patient Name</th>
                    <th className="px-6 py-4 font-semibold">Phone</th>
                    <th className="px-6 py-4 font-semibold">Email</th>
                    <th className="px-6 py-4 font-semibold">Requested On</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {consultations.map((consult) => (
                    <tr key={consult.id} className="hover:bg-cream/20 transition-colors">
                      <td className="px-6 py-4 font-medium text-text">{consult.name}</td>
                      <td className="px-6 py-4 text-text-muted">{consult.phone}</td>
                      <td className="px-6 py-4 text-text-muted">{consult.email || "-"}</td>
                      <td className="px-6 py-4 text-text-muted">{formatDate(consult.created_at)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center w-fit gap-1 ${consult.status.toLowerCase() === "approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {consult.status.toLowerCase() === "approved" ? <FiCheckCircle size={12}/> : <FiXCircle size={12}/>}
                          {consult.status.charAt(0).toUpperCase() + consult.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex justify-end gap-3">
                        <button onClick={() => { setSelectedConsultation(consult); setViewModalOpen(true); }} className="text-olive hover:text-olive-dark p-2 hover:bg-olive/10 rounded-lg" title="View Details"><FiEye size={18} /></button>
                        {consult.status.toLowerCase() !== "approved" && (
                            <button onClick={() => handleUpdateStatus(consult.id, "approved")} className="text-green-500 hover:text-green-700 p-2 hover:bg-green-50 rounded-lg" title="Approve Booking"><FiCheckCircle size={18} /></button>
                        )}
                        <button onClick={(e) => { setDeleteAnchorEl(e.currentTarget); setItemToDelete(consult.id); }} className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg" title="Delete"><FiTrash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {consultations.length === 0 && <div className="p-8 text-center text-text-muted font-lato">No requests found.</div>}
          </div>

          {/* View Modal */}
          <AnimatePresence>
            {viewModalOpen && selectedConsultation && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-border/50">
                  <div className="bg-gradient-to-r from-olive to-olive-dark p-6 text-white flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-playfair mb-1">Consultation Details</h2>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center w-fit gap-1 bg-white/20 text-white shadow-sm backdrop-blur-md`}>
                        {selectedConsultation.status.toLowerCase() === "approved" ? <FiCheckCircle size={12}/> : <FiXCircle size={12}/>}
                        {selectedConsultation.status.charAt(0).toUpperCase() + selectedConsultation.status.slice(1)}
                      </span>
                    </div>
                    <button onClick={() => setViewModalOpen(false)} className="text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full"><FiX size={20} /></button>
                  </div>
                  <div className="p-6 space-y-6 font-lato">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-cream/30 p-4 rounded-xl border border-cream/50 col-span-2 sm:col-span-1">
                        <p className="text-sm text-text-muted mb-1 flex items-center gap-2"><FiUser className="text-olive" /> Name</p>
                        <p className="font-semibold text-text text-lg">{selectedConsultation.name}</p>
                      </div>
                      <div className="bg-cream/30 p-4 rounded-xl border border-cream/50 col-span-2 sm:col-span-1">
                        <p className="text-sm text-text-muted mb-1 flex items-center gap-2"><FiCalendar className="text-olive" /> Requested</p>
                        <p className="font-semibold text-text">{formatDate(selectedConsultation.created_at)}</p>
                      </div>
                      <div className="bg-cream/30 p-4 rounded-xl border border-cream/50 col-span-2 sm:col-span-1">
                        <p className="text-sm text-text-muted mb-1 flex items-center gap-2"><FiPhone className="text-olive" /> Phone</p>
                        <p className="font-semibold text-text">{selectedConsultation.phone}</p>
                      </div>
                      <div className="bg-cream/30 p-4 rounded-xl border border-cream/50 col-span-2 sm:col-span-1">
                        <p className="text-sm text-text-muted mb-1 flex items-center gap-2"><FiMail className="text-olive" /> Email</p>
                        <p className="font-semibold text-text break-all">{selectedConsultation.email || "-"}</p>
                      </div>
                    </div>
                    {selectedConsultation.message && (
                      <div>
                        <p className="text-sm text-text-muted mb-1">Message</p>
                        <p className="text-text bg-gray-50 p-4 rounded-xl border border-border min-h-[100px] whitespace-pre-wrap">{selectedConsultation.message}</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4 border-t border-border bg-gray-50 flex justify-end gap-3">
                    {selectedConsultation.status.toLowerCase() !== "approved" && (
                      <button onClick={() => { handleUpdateStatus(selectedConsultation.id, "approved"); setViewModalOpen(false); }} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition-colors flex items-center gap-2">
                        <FiCheckCircle /> Approve Booking
                      </button>
                    )}
                    <button onClick={() => setViewModalOpen(false)} className="px-5 py-2 text-text hover:bg-gray-200 bg-white border border-border rounded-lg">Close</button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <Popover open={Boolean(deleteAnchorEl)} anchorEl={deleteAnchorEl} onClose={() => setDeleteAnchorEl(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <div className="p-4 font-lato">
              <p className="text-text mb-4">Are you sure you want to delete this consultation?</p>
              <div className="flex justify-end gap-2">
                <button onClick={() => setDeleteAnchorEl(null)} className="px-3 py-1.5 text-sm text-text hover:bg-cream/50 rounded-lg">Cancel</button>
                <button onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-sm rounded-lg">Delete</button>
              </div>
            </div>
          </Popover>
        </motion.div>
      )}
    </>
  );
}