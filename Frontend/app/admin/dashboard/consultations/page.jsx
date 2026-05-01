"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiTrash2, FiEye, FiX, FiCalendar, FiClock, FiUser, FiTag } from "react-icons/fi";
import { Popover } from "@mui/material";

export default function ConsultationsManagement() {
  const [consultations, setConsultations] = useState([
    { id: 1, name: "Rahul Verma", date: "2026-05-02", time: "10:00 AM", type: "Panchakarma Consultation", status: "Pending" },
    { id: 2, name: "Sarah Jenkins", date: "2026-05-03", time: "02:30 PM", type: "General Checkup", status: "Confirmed" },
    { id: 3, name: "Amit Kumar", date: "2026-05-05", time: "11:00 AM", type: "Yoga Therapy", status: "Pending", phone: "+91 9876543210", notes: "First time consultation." },
  ]);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const [deleteAnchorEl, setDeleteAnchorEl] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDeleteClick = (event, id) => {
    setDeleteAnchorEl(event.currentTarget);
    setItemToDelete(id);
  };

  const handleDeleteClose = () => {
    setDeleteAnchorEl(null);
    setItemToDelete(null);
  };

  const confirmDelete = () => {
    if (itemToDelete !== null) {
      handleDelete(itemToDelete);
      handleDeleteClose();
    }
  };

  const deleteOpen = Boolean(deleteAnchorEl);
  const deletePopoverId = deleteOpen ? 'delete-popover' : undefined;

  const handleView = (consult) => {
    setSelectedConsultation(consult);
    setViewModalOpen(true);
  };

  const handleConfirm = (id) => {
    setConsultations(consultations.map(c => c.id === id ? { ...c, status: "Confirmed" } : c));
  };

  const handleDelete = (id) => {
    setConsultations(consultations.filter(c => c.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-playfair text-text mb-2">Consultation Bookings</h1>
          <p className="text-text-muted font-lato">View and manage consultation requests from patients.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-cream/50 text-text-muted text-sm font-lato uppercase tracking-wider border-b border-border">
                <th className="px-6 py-4 font-semibold">Patient Name</th>
                <th className="px-6 py-4 font-semibold">Requested Date</th>
                <th className="px-6 py-4 font-semibold">Time</th>
                <th className="px-6 py-4 font-semibold">Consultation Type</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {consultations.map((consult) => (
                <tr key={consult.id} className="hover:bg-cream/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-text">{consult.name}</td>
                  <td className="px-6 py-4 text-text-muted">{consult.date}</td>
                  <td className="px-6 py-4 text-text-muted">{consult.time}</td>
                  <td className="px-6 py-4 text-text-muted">{consult.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center w-fit gap-1 ${
                      consult.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {consult.status === "Confirmed" ? <FiCheckCircle size={12}/> : <FiXCircle size={12}/>}
                      {consult.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-end gap-3">
                    <button onClick={() => handleView(consult)} className="text-olive hover:text-olive-dark p-2 hover:bg-olive/10 rounded-lg transition-colors" title="View Details">
                      <FiEye size={18} />
                    </button>
                    <button onClick={() => handleConfirm(consult.id)} className="text-green-500 hover:text-green-700 p-2 hover:bg-green-50 rounded-lg transition-colors" title="Confirm Booking">
                      <FiCheckCircle size={18} />
                    </button>
                    <button aria-describedby={deletePopoverId} onClick={(e) => handleDeleteClick(e, consult.id)} className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {consultations.length === 0 && (
          <div className="p-8 text-center text-text-muted font-lato">
            No consultation requests found.
          </div>
        )}
      </div>

      <AnimatePresence>
        {viewModalOpen && selectedConsultation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-border/50"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-olive to-olive-dark p-6 text-white flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-playfair mb-1">Consultation Details</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center w-fit gap-1 bg-white/20 text-white shadow-sm backdrop-blur-md`}>
                    {selectedConsultation.status === "Confirmed" ? <FiCheckCircle size={12}/> : <FiXCircle size={12}/>}
                    {selectedConsultation.status}
                  </span>
                </div>
                <button onClick={() => setViewModalOpen(false)} className="text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full">
                  <FiX size={20} />
                </button>
              </div>
              
              {/* Content */}
              <div className="p-6 space-y-6 font-lato">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-cream/30 p-4 rounded-xl border border-cream/50">
                    <p className="text-sm text-text-muted mb-1 flex items-center gap-2"><FiUser className="text-olive" /> Patient Name</p>
                    <p className="font-semibold text-text text-lg">{selectedConsultation.name}</p>
                  </div>
                  <div className="bg-cream/30 p-4 rounded-xl border border-cream/50">
                    <p className="text-sm text-text-muted mb-1 flex items-center gap-2"><FiTag className="text-olive" /> Type</p>
                    <p className="font-semibold text-text">{selectedConsultation.type}</p>
                  </div>
                  <div className="bg-cream/30 p-4 rounded-xl border border-cream/50">
                    <p className="text-sm text-text-muted mb-1 flex items-center gap-2"><FiCalendar className="text-olive" /> Date</p>
                    <p className="font-semibold text-text">{selectedConsultation.date}</p>
                  </div>
                  <div className="bg-cream/30 p-4 rounded-xl border border-cream/50">
                    <p className="text-sm text-text-muted mb-1 flex items-center gap-2"><FiClock className="text-olive" /> Time</p>
                    <p className="font-semibold text-text">{selectedConsultation.time}</p>
                  </div>
                </div>
                
                {selectedConsultation.phone && (
                  <div>
                    <p className="text-sm text-text-muted mb-1">Contact Details</p>
                    <p className="font-semibold text-text bg-gray-50 p-3 rounded-lg border border-border">{selectedConsultation.phone}</p>
                  </div>
                )}
                
                {selectedConsultation.notes && (
                  <div>
                    <p className="text-sm text-text-muted mb-1">Additional Notes</p>
                    <p className="text-text bg-gray-50 p-3 rounded-lg border border-border min-h-[80px]">{selectedConsultation.notes}</p>
                  </div>
                )}

              </div>
              
              {/* Footer */}
              <div className="p-4 border-t border-border bg-gray-50 flex justify-end gap-3">
                {selectedConsultation.status !== "Confirmed" && (
                  <button onClick={() => { handleConfirm(selectedConsultation.id); setViewModalOpen(false); }} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition-colors shadow-sm font-medium flex items-center gap-2">
                    <FiCheckCircle /> Confirm Booking
                  </button>
                )}
                <button onClick={() => setViewModalOpen(false)} className="px-5 py-2 text-text hover:bg-gray-200 bg-white border border-border rounded-lg transition-colors font-medium">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Popover
        id={deletePopoverId}
        open={deleteOpen}
        anchorEl={deleteAnchorEl}
        onClose={handleDeleteClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className="p-4 font-lato">
          <p className="text-text mb-4">Are you sure you want to delete this consultation?</p>
          <div className="flex justify-end gap-2">
            <button onClick={handleDeleteClose} className="px-3 py-1.5 text-sm text-text hover:bg-cream/50 rounded-lg transition-colors">Cancel</button>
            <button onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-sm rounded-lg transition-colors">Delete</button>
          </div>
        </div>
      </Popover>
    </motion.div>
  );
}
