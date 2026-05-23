"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit, FiTrash2, FiX, FiImage, FiMinus } from "react-icons/fi";
import { Popover } from "@mui/material";
import Preloader from "@/components/Preloader";

const API_BASE_URL = "http://127.0.0.1:8000/api/packages/";
const SERVER_URL = "http://127.0.0.1:8000";

const defaultSection = { heading: "", description: "" };

const defaultFormData = {
  title: "",
  price: "",
  status: "active",
  image: null,
  sections: [{ ...defaultSection }],
};

export default function PackagesManagement() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(defaultFormData);

  const [deleteAnchorEl, setDeleteAnchorEl] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setPackages(data);
    } catch (error) {
      console.error("Failed to fetch packages:", error);
    } finally {
      setLoading(false);
    }
  };

  // ── Delete popover ──────────────────────────────────────────────
  const handleDeleteClick = (event, id) => {
    setDeleteAnchorEl(event.currentTarget);
    setItemToDelete(id);
  };
  const handleDeleteClose = () => {
    setDeleteAnchorEl(null);
    setItemToDelete(null);
  };
  const confirmDelete = async () => {
    if (itemToDelete !== null) {
      try {
        await fetch(`${API_BASE_URL}${itemToDelete}/`, { method: "DELETE" });
        setPackages(packages.filter((p) => p.id !== itemToDelete));
      } catch (error) {
        console.error("Failed to delete package:", error);
      }
      handleDeleteClose();
    }
  };
  const deleteOpen = Boolean(deleteAnchorEl);
  const deletePopoverId = deleteOpen ? "delete-popover" : undefined;

  // ── Form helpers ────────────────────────────────────────────────
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // Section (heading + description) handlers
  const handleSectionChange = (index, field, value) => {
    setFormData((prev) => {
      const sections = [...prev.sections];
      sections[index] = { ...sections[index], [field]: value };
      return { ...prev, sections };
    });
  };

  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      sections: [...prev.sections, { ...defaultSection }],
    }));
  };

  const removeSection = (index) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  // ── Modal open helpers ──────────────────────────────────────────
  const handleAddClick = () => {
    setEditId(null);
    setFormData(defaultFormData);
    setIsModalOpen(true);
  };

  const handleEditClick = (pkg) => {
    setEditId(pkg.id);
    // Support both old (heading/description flat) and new (sections array) structures
    const sections =
      pkg.sections && pkg.sections.length > 0
        ? pkg.sections.map((s) => ({ heading: s.heading || "", description: s.description || "" }))
        : [{ heading: pkg.heading || "", description: pkg.description || "" }];

    setFormData({
      title: pkg.title || "",
      price: pkg.price || "",
      status: pkg.status || "active",
      image: null,
      sections,
    });
    setIsModalOpen(true);
  };

  // ── Submit ──────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editId ? `${API_BASE_URL}${editId}/` : API_BASE_URL;
    const method = editId ? "PUT" : "POST";

    const submitData = new FormData();
    submitData.append("title", formData.title);
    if (formData.price) submitData.append("price", formData.price);
    submitData.append("status", formData.status);
    // Send sections as JSON string; parse in your Django view
    submitData.append("sections", JSON.stringify(formData.sections));

    if (formData.image instanceof File) {
      submitData.append("image", formData.image);
    }

    try {
      const response = await fetch(url, { method, body: submitData });
      if (response.ok) {
        fetchPackages();
        setIsModalOpen(false);
        setFormData(defaultFormData);
        setEditId(null);
      } else {
        console.error("Failed to save package");
      }
    } catch (error) {
      console.error("Error saving package:", error);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    return imagePath.startsWith("http") ? imagePath : `${SERVER_URL}${imagePath}`;
  };

  // Helper function removed

  return (
    <>
      <Preloader isLoading={loading} isFullPage={false} />
      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* ── Header ─────────────────────────────────────────── */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-playfair text-text mb-2">Ayurveda Packages</h1>
              <p className="text-text-muted font-lato">Manage the treatment and wellness packages.</p>
            </div>
            <button
              onClick={handleAddClick}
              className="bg-olive hover:bg-olive-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-lato shadow-sm"
            >
              <FiPlus /> Add New Package
            </button>
          </div>

          {/* ── Table ──────────────────────────────────────────── */}
          <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-cream/50 text-text-muted text-sm font-lato uppercase tracking-wider border-b border-border">
                    <th className="px-6 py-4 font-semibold">Image</th>
                    <th className="px-6 py-4 font-semibold">Title</th>
                    <th className="px-6 py-4 font-semibold min-w-[300px]">Sections Details</th>
                    <th className="px-6 py-4 font-semibold">Price</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {packages.map((pkg) => (
                    <tr key={pkg.id} className="hover:bg-cream/20 transition-colors">
                      <td className="px-6 py-4">
                        {pkg.image ? (
                          <img
                            src={getImageUrl(pkg.image)}
                            alt={pkg.title}
                            className="w-12 h-12 object-cover rounded-md border border-border"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/48?text=Error"; }}
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                            <FiImage />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-text min-w-[150px]">{pkg.title}</td>
                      <td className="px-6 py-4">
                        {pkg.sections && pkg.sections.length > 0 ? (
                          <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                            {pkg.sections.map((sec, idx) => (
                              <div key={idx} className="bg-cream/30 p-3 rounded-lg border border-border">
                                {sec.heading && <div className="font-semibold text-text text-sm mb-1">{sec.heading}</div>}
                                {sec.description && <div className="text-xs text-text-muted whitespace-pre-wrap leading-relaxed">{sec.description}</div>}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-text-muted text-sm">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-text-muted">{pkg.price}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                          pkg.status?.toLowerCase() === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {pkg.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex justify-end gap-3">
                        <button
                          onClick={() => handleEditClick(pkg)}
                          className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          aria-describedby={deletePopoverId}
                          onClick={(e) => handleDeleteClick(e, pkg.id)}
                          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
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

          {/* ── Add / Edit Modal ────────────────────────────────── */}
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
                  className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                >
                  {/* Modal Header */}
                  <div className="flex justify-between items-center p-6 border-b border-border sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-playfair text-text">
                      {editId ? "Edit Package" : "Add New Package"}
                    </h2>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-text-muted hover:text-text transition-colors"
                    >
                      <FiX size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="p-6 space-y-5 font-lato">

                    {/* Title */}
                    <div>
                      <label className="block text-sm font-semibold text-text mb-1">Package Title</label>
                      <input
                        required
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors"
                        placeholder="e.g. Detox Package"
                      />
                    </div>

                    {/* Dynamic Sections */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-semibold text-text">
                          Headings & Descriptions
                        </label>
                        <button
                          type="button"
                          onClick={addSection}
                          className="flex items-center gap-1.5 text-sm text-olive hover:text-olive-dark font-semibold transition-colors px-3 py-1.5 rounded-lg hover:bg-olive/10 border border-olive/30"
                        >
                          <FiPlus size={15} /> Add Section
                        </button>
                      </div>

                      <div className="space-y-4">
                        {formData.sections.map((section, index) => (
                          <div
                            key={index}
                            className="relative border border-border rounded-xl p-4 bg-cream/20 space-y-3"
                          >
                            {/* Section number + remove */}
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                                Section {index + 1}
                              </span>
                              {formData.sections.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeSection(index)}
                                  className="text-red-400 hover:text-red-600 p-1 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Remove section"
                                >
                                  <FiMinus size={15} />
                                </button>
                              )}
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-text mb-1">Heading</label>
                              <input
                                required
                                type="text"
                                value={section.heading}
                                onChange={(e) => handleSectionChange(index, "heading", e.target.value)}
                                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors bg-white text-sm"
                                placeholder="e.g. Refresh Your Mind"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-text mb-1">Description</label>
                              <textarea
                                required
                                value={section.description}
                                onChange={(e) => handleSectionChange(index, "description", e.target.value)}
                                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors bg-white text-sm"
                                placeholder="Enter details for this section..."
                                rows={3}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Image */}
                    <div>
                      <label className="block text-sm font-semibold text-text mb-1">Package Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cream file:text-olive hover:file:bg-cream/80"
                      />
                      {editId && (
                        <p className="text-xs text-text-muted mt-1">Leave empty to keep the current image.</p>
                      )}
                    </div>

                    {/* Price + Status */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-text mb-1">Price</label>
                        <input
                          type="text"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors"
                          placeholder="e.g. ₹500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-text mb-1">Status</label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-border">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 text-text hover:bg-cream/50 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-olive hover:bg-olive-dark text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Save Package
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Delete Popover ──────────────────────────────────── */}
          <Popover
            id={deletePopoverId}
            open={deleteOpen}
            anchorEl={deleteAnchorEl}
            onClose={handleDeleteClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <div className="p-4 font-lato">
              <p className="text-text mb-4">Are you sure you want to delete this package?</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleDeleteClose}
                  className="px-3 py-1.5 text-sm text-text hover:bg-cream/50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-sm rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </Popover>
        </motion.div>
      )}
    </>
  );
}