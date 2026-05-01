"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit, FiTrash2, FiX } from "react-icons/fi";
import { Popover } from "@mui/material";

export default function DoctorsManagement() {
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Ananya Sharma", specialization: "Panchakarma Specialist", experience: "15 Years", status: "Active" },
    { id: 2, name: "Dr. Vikram Singh", specialization: "Ayurvedic Physician", experience: "10 Years", status: "Active" },
    { id: 3, name: "Dr. Priya Patel", specialization: "Yoga Therapist", experience: "8 Years", status: "On Leave" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: "", specialization: "", experience: "", status: "Active" });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setEditId(null);
    setFormData({ name: "", specialization: "", experience: "", status: "Active" });
    setIsModalOpen(true);
  };

  const handleEditClick = (doctor) => {
    setEditId(doctor.id);
    setFormData(doctor);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setDoctors(doctors.filter((d) => d.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setDoctors(doctors.map((d) => d.id === editId ? { ...formData, id: editId } : d));
    } else {
      const newId = doctors.length > 0 ? Math.max(...doctors.map((d) => d.id)) + 1 : 1;
      setDoctors([...doctors, { id: newId, ...formData }]);
    }
    setIsModalOpen(false);
    setFormData({ name: "", specialization: "", experience: "", status: "Active" });
    setEditId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-playfair text-text mb-2">Doctors Management</h1>
          <p className="text-text-muted font-lato">Manage the list of our specialists and doctors.</p>
        </div>
        <button onClick={handleAddClick} className="bg-olive hover:bg-olive-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-lato shadow-sm">
          <FiPlus /> Add New Doctor
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-cream/50 text-text-muted text-sm font-lato uppercase tracking-wider border-b border-border">
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Specialization</th>
                <th className="px-6 py-4 font-semibold">Experience</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {doctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-cream/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-text">{doctor.name}</td>
                  <td className="px-6 py-4 text-text-muted">{doctor.specialization}</td>
                  <td className="px-6 py-4 text-text-muted">{doctor.experience}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      doctor.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {doctor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-end gap-3">
                    <button onClick={() => handleEditClick(doctor)} className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                      <FiEdit size={18} />
                    </button>
                    <button aria-describedby={deletePopoverId} onClick={(e) => handleDeleteClick(e, doctor.id)} className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {doctors.length === 0 && (
          <div className="p-8 text-center text-text-muted font-lato">
            No doctors found. Add one to get started.
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-border">
                <h2 className="text-xl font-playfair text-text">{editId ? "Edit Doctor" : "Add New Doctor"}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text transition-colors">
                  <FiX size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4 font-lato">
                <div>
                  <label className="block text-sm font-semibold text-text mb-1">Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors" placeholder="e.g. Dr. John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text mb-1">Specialization</label>
                  <input required type="text" name="specialization" value={formData.specialization} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors" placeholder="e.g. Ayurvedic Physician" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text mb-1">Experience</label>
                  <input required type="text" name="experience" value={formData.experience} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors" placeholder="e.g. 5 Years" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text mb-1">Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors">
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-text hover:bg-cream/50 rounded-lg transition-colors">Cancel</button>
                  <button type="submit" className="bg-olive hover:bg-olive-dark text-white px-4 py-2 rounded-lg transition-colors">Save</button>
                </div>
              </form>
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
          <p className="text-text mb-4">Are you sure you want to delete this doctor?</p>
          <div className="flex justify-end gap-2">
            <button onClick={handleDeleteClose} className="px-3 py-1.5 text-sm text-text hover:bg-cream/50 rounded-lg transition-colors">Cancel</button>
            <button onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-sm rounded-lg transition-colors">Delete</button>
          </div>
        </div>
      </Popover>
    </motion.div>
  );
}
