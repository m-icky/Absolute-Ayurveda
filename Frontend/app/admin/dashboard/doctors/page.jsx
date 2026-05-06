"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit, FiTrash2, FiX } from "react-icons/fi";
import { Popover } from "@mui/material";
import { authHeaders, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/specialists/`;

export default function DoctorsManagement() {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    specialty: "",
    description: "",
    experience: "",
    status: "active",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const [deleteAnchorEl, setDeleteAnchorEl] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  // FETCH
  const fetchDoctors = async () => {
    try {
      const res = await fetch(API_URL, {
        headers: authHeaders(),
      });

      if (res.status === 401) {
        logout(router);
        return;
      }

      const data = await res.json();
      setDoctors(data);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // INPUT
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else if (name === "experience") {
      setFormData((prev) => ({
        ...prev,
        experience: value === "" ? "" : Number(value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // VALIDATION
  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim())        newErrors.name        = "Name is required";
    if (!formData.designation.trim()) newErrors.designation = "Designation is required";
    if (!formData.specialty.trim())   newErrors.specialty   = "Specialty is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (formData.experience === "" || formData.experience <= 0)
                                      newErrors.experience  = "Valid experience is required";
    if (!editId && !formData.image)   newErrors.image       = "Image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ADD
  const handleAddClick = () => {
    setEditId(null);
    setFormData({ name: "", designation: "", specialty: "", description: "", experience: "", status: "active", image: null });
    setPreview(null);
    setErrors({});
    setIsModalOpen(true);
  };

  // EDIT
  const handleEditClick = (doc) => {
    setEditId(doc.id);
    setFormData({
      name:        doc.name        || "",
      designation: doc.designation || "",
      specialty:   doc.specialty   || "",
      description: doc.description || "",
      experience:  doc.experience  ?? "",
      status:      doc.status      || "active",
      image:       null,
    });
    setPreview(doc.image || null);
    setErrors({});
    setIsModalOpen(true);
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        form.append(key, formData[key]);
      }
    });

    const method = editId ? "PUT" : "POST";
    const url    = editId ? `${API_URL}${editId}/` : API_URL;

    // For multipart/form-data, only pass Authorization — not Content-Type
    const token = authHeaders().Authorization;

    const res = await fetch(url, {
      method,
      headers: token ? { Authorization: token } : {},
      body: form,
    });

    if (res.status === 401) { logout(router); return; }

    setIsModalOpen(false);
    fetchDoctors();
  };

  // DELETE
  const handleDeleteClick = (event, id) => {
    setDeleteAnchorEl(event.currentTarget);
    setItemToDelete(id);
  };

  const handleDeleteClose = () => {
    setDeleteAnchorEl(null);
    setItemToDelete(null);
  };

  const confirmDelete = async () => {
    const res = await fetch(`${API_URL}${itemToDelete}/`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    if (res.status === 401) { logout(router); return; }

    fetchDoctors();
    handleDeleteClose();
  };

  const deleteOpen = Boolean(deleteAnchorEl);

  if (loading) {
    return <div className="p-10 text-center font-lato text-text-muted">Loading doctors...</div>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-playfair text-text mb-2">Doctors Management</h1>
          <p className="text-text-muted font-lato">Manage the list of our specialists and doctors.</p>
        </div>
        <button
          onClick={handleAddClick}
          className="bg-olive hover:bg-olive-dark text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FiPlus /> Add New Doctor
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-cream/50 text-text-muted text-sm border-b border-border">
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Designation</th>
                <th className="px-6 py-4">Specialty</th>
                <th className="px-6 py-4">Experience</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {doctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-cream/20 border-b border-border/50">
                  <td className="px-6 py-4">
                    {doc.image && (
                      <img
                        src={doc.image.startsWith("http") ? doc.image : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${doc.image}`}
                        className="w-12 h-12 rounded object-cover"
                        alt={doc.name}
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 font-lato text-text">{doc.name}</td>
                  <td className="px-6 py-4 font-lato text-text-muted">{doc.designation}</td>
                  <td className="px-6 py-4 font-lato text-text-muted">{doc.specialty}</td>
                  <td className="px-6 py-4 font-lato text-text-muted">
                    {doc.experience ? `${doc.experience} Years` : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${doc.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => handleEditClick(doc)} className="text-text-muted hover:text-olive transition-colors">
                        <FiEdit size={18} />
                      </button>
                      <button onClick={(e) => handleDeleteClick(e, doc.id)} className="text-text-muted hover:text-red-500 transition-colors">
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {doctors.length === 0 && (
          <div className="p-8 text-center text-text-muted font-lato">No doctors found</div>
        )}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center p-6 border-b border-border">
                <h2 className="text-xl font-playfair text-text font-bold">
                  {editId ? "Edit Doctor" : "Add Doctor"}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text transition-colors">
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1 font-lato">Name</label>
                  <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Dr. John Doe"
                    className="w-full border border-border rounded-lg px-4 py-2.5 font-lato focus:border-olive focus:ring-1 focus:ring-olive outline-none" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1 font-lato">Designation</label>
                  <input name="designation" value={formData.designation} onChange={handleInputChange} placeholder="Senior Physician"
                    className="w-full border border-border rounded-lg px-4 py-2.5 font-lato focus:border-olive focus:ring-1 focus:ring-olive outline-none" />
                  {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1 font-lato">Specialty</label>
                  <input name="specialty" value={formData.specialty} onChange={handleInputChange} placeholder="Ayurvedic Medicine"
                    className="w-full border border-border rounded-lg px-4 py-2.5 font-lato focus:border-olive focus:ring-1 focus:ring-olive outline-none" />
                  {errors.specialty && <p className="text-red-500 text-xs mt-1">{errors.specialty}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1 font-lato">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Brief description..." rows={3}
                    className="w-full border border-border rounded-lg px-4 py-2.5 font-lato focus:border-olive focus:ring-1 focus:ring-olive outline-none resize-none" />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1 font-lato">Experience (years)</label>
                  <input type="number" name="experience" value={formData.experience ?? ""} onChange={handleInputChange} placeholder="10"
                    className="w-full border border-border rounded-lg px-4 py-2.5 font-lato focus:border-olive focus:ring-1 focus:ring-olive outline-none" />
                  {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1 font-lato">Image</label>
                  <input type="file" name="image" accept="image/*" onChange={handleInputChange}
                    className="w-full border border-border rounded-lg px-4 py-2.5 font-lato text-sm" />
                  {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                  {preview && <img src={preview} className="w-20 h-20 mt-2 object-cover rounded-lg" alt="Preview" />}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1 font-lato">Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}
                    className="w-full border border-border rounded-lg px-4 py-2.5 font-lato focus:border-olive focus:ring-1 focus:ring-olive outline-none">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-border text-text-muted font-lato hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button type="submit"
                    className="bg-olive hover:bg-olive-dark text-white px-6 py-2 rounded-lg font-lato transition-colors">
                    Save
                  </button>
                </div>

              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DELETE POPOVER */}
      <Popover open={deleteOpen} anchorEl={deleteAnchorEl} onClose={handleDeleteClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <div className="p-4 font-lato">
          <p className="text-text text-sm mb-3">Delete this doctor?</p>
          <div className="flex gap-2">
            <button onClick={handleDeleteClose}
              className="px-3 py-1.5 text-sm border border-border rounded-lg text-text-muted hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button onClick={confirmDelete}
              className="px-3 py-1.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
              Delete
            </button>
          </div>
        </div>
      </Popover>

    </motion.div>
  );
}