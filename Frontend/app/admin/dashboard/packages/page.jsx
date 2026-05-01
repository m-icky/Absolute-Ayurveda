"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit, FiTrash2, FiX } from "react-icons/fi";
import { Popover } from "@mui/material";

export default function PackagesManagement() {
  const [packages, setPackages] = useState([
    { id: 1, name: "Panchakarma Detox", duration: "14 Days", price: "$1,200", status: "Active" },
    { id: 2, title: "Rejuvenation Therapy", duration: "7 Days", price: "$650", status: "Active" },
    { id: 3, title: "Stress Relief Package", duration: "3 Days", price: "$300", status: "Draft" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: "", duration: "", price: "", status: "Active" });

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
    setFormData({ name: "", duration: "", price: "", status: "Active" });
    setIsModalOpen(true);
  };

  const handleEditClick = (pkg) => {
    setEditId(pkg.id);
    setFormData({ ...pkg, name: pkg.name || pkg.title });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setPackages(packages.filter((p) => p.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setPackages(packages.map((p) => p.id === editId ? { ...formData, id: editId } : p));
    } else {
      const newId = packages.length > 0 ? Math.max(...packages.map((p) => p.id)) + 1 : 1;
      setPackages([...packages, { id: newId, ...formData }]);
    }
    setIsModalOpen(false);
    setFormData({ name: "", duration: "", price: "", status: "Active" });
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
          <h1 className="text-3xl font-playfair text-text mb-2">Ayurveda Packages</h1>
          <p className="text-text-muted font-lato">Manage the treatment and wellness packages.</p>
        </div>
        <button onClick={handleAddClick} className="bg-olive hover:bg-olive-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-lato shadow-sm">
          <FiPlus /> Add New Package
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-cream/50 text-text-muted text-sm font-lato uppercase tracking-wider border-b border-border">
                <th className="px-6 py-4 font-semibold">Package Name</th>
                <th className="px-6 py-4 font-semibold">Duration</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-cream/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-text">{pkg.name || pkg.title}</td>
                  <td className="px-6 py-4 text-text-muted">{pkg.duration}</td>
                  <td className="px-6 py-4 text-text-muted">{pkg.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      pkg.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {pkg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-end gap-3">
                    <button onClick={() => handleEditClick(pkg)} className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                      <FiEdit size={18} />
                    </button>
                    <button aria-describedby={deletePopoverId} onClick={(e) => handleDeleteClick(e, pkg.id)} className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {packages.length === 0 && (
          <div className="p-8 text-center text-text-muted font-lato">
            No packages found. Add one to get started.
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
                <h2 className="text-xl font-playfair text-text">{editId ? "Edit Package" : "Add New Package"}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text transition-colors">
                  <FiX size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4 font-lato">
                <div>
                  <label className="block text-sm font-semibold text-text mb-1">Package Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors" placeholder="e.g. Detox Package" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text mb-1">Duration</label>
                  <input required type="text" name="duration" value={formData.duration} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors" placeholder="e.g. 7 Days" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text mb-1">Price</label>
                  <input required type="text" name="price" value={formData.price} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors" placeholder="e.g. $500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text mb-1">Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors">
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
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
          <p className="text-text mb-4">Are you sure you want to delete this package?</p>
          <div className="flex justify-end gap-2">
            <button onClick={handleDeleteClose} className="px-3 py-1.5 text-sm text-text hover:bg-cream/50 rounded-lg transition-colors">Cancel</button>
            <button onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-sm rounded-lg transition-colors">Delete</button>
          </div>
        </div>
      </Popover>
    </motion.div>
  );
}
