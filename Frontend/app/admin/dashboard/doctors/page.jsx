"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit, FiTrash2, FiX } from "react-icons/fi";
import { Popover } from "@mui/material";

const API_URL = "http://127.0.0.1:8000/api/specialists/";

export default function DoctorsManagement() {
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

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
    const res = await fetch(API_URL);
    const data = await res.json();
    setDoctors(data);
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

    // remove error when typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.designation.trim()) newErrors.designation = "Designation is required";
    if (!formData.specialty.trim()) newErrors.specialty = "Specialty is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";

    if (formData.experience === "" || formData.experience <= 0) {
      newErrors.experience = "Valid experience is required";
    }

    if (!editId && !formData.image) {
      newErrors.image = "Image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ADD
  const handleAddClick = () => {
    setEditId(null);
    setFormData({
      name: "",
      designation: "",
      specialty: "",
      description: "",
      experience: "",
      status: "active",
      image: null,
    });
    setPreview(null);
    setErrors({});
    setIsModalOpen(true);
  };

  // EDIT
  const handleEditClick = (doc) => {
    setEditId(doc.id);
    setFormData({
      name: doc.name || "",
      designation: doc.designation || "",
      specialty: doc.specialty || "",
      description: doc.description || "",
      experience: doc.experience ?? "",
      status: doc.status || "active",
      image: null,
    });
    setPreview(doc.image || null);
    setErrors({});
    setIsModalOpen(true);
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; // stop if invalid

    const form = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        form.append(key, formData[key]);
      }
    });

    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_URL}${editId}/` : API_URL;

    await fetch(url, {
      method,
      body: form,
    });

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
    await fetch(`${API_URL}${itemToDelete}/`, { method: "DELETE" });
    fetchDoctors();
    handleDeleteClose();
  };

  const deleteOpen = Boolean(deleteAnchorEl);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-playfair text-text mb-2">
            Doctors Management
          </h1>
          <p className="text-text-muted font-lato">
            Manage the list of our specialists and doctors.
          </p>
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
                <tr key={doc.id} className="hover:bg-cream/20">
                  <td className="px-6 py-4">
                    {doc.image && (
                      <img
                        src={doc.image.startsWith("http") ? doc.image : `http://127.0.0.1:8000${doc.image}`}
                        className="w-12 h-12 rounded object-cover"
                      />
                    )}
                  </td>

                  <td className="px-6 py-4">{doc.name}</td>
                  <td className="px-6 py-4">{doc.designation}</td>
                  <td className="px-6 py-4">{doc.specialty}</td>
                  <td className="px-6 py-4">
                    {doc.experience ? `${doc.experience} Years` : "-"}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      {doc.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 flex justify-end gap-3">
                    <button onClick={() => handleEditClick(doc)}>
                      <FiEdit />
                    </button>

                    <button onClick={(e) => handleDeleteClick(e, doc.id)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {doctors.length === 0 && (
          <div className="p-8 text-center text-text-muted">
            No doctors found
          </div>
        )}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <motion.div className="bg-white rounded-xl w-full max-w-md">
              <div className="flex justify-between p-6 border-b">
                <h2>{editId ? "Edit Doctor" : "Add Doctor"}</h2>
                <button onClick={() => setIsModalOpen(false)}>
                  <FiX />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">

                <div>
                  <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" className="w-full border p-2" />
                  {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                </div>

                <div>
                  <input name="designation" value={formData.designation} onChange={handleInputChange} placeholder="Designation" className="w-full border p-2" />
                  {errors.designation && <p className="text-red-500 text-xs">{errors.designation}</p>}
                </div>

                <div>
                  <input name="specialty" value={formData.specialty} onChange={handleInputChange} placeholder="Specialty" className="w-full border p-2" />
                  {errors.specialty && <p className="text-red-500 text-xs">{errors.specialty}</p>}
                </div>

                <div>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="w-full border p-2" />
                  {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
                </div>

                <div>
                  <input type="number" name="experience" value={formData.experience ?? ""} onChange={handleInputChange} placeholder="Experience (years)" className="w-full border p-2" />
                  {errors.experience && <p className="text-red-500 text-xs">{errors.experience}</p>}
                </div>

                <div>
                  <input type="file" name="image" onChange={handleInputChange} />
                  {errors.image && <p className="text-red-500 text-xs">{errors.image}</p>}
                  {preview && <img src={preview} className="w-20 h-20 mt-2 object-cover" />}
                </div>

                <select name="status" value={formData.status} onChange={handleInputChange} className="w-full border p-2">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="bg-olive text-white px-4 py-2 rounded">Save</button>
                </div>

              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DELETE */}
      <Popover open={deleteOpen} anchorEl={deleteAnchorEl} onClose={handleDeleteClose}>
        <div className="p-4">
          <p>Delete this doctor?</p>
          <div className="flex gap-2 mt-2">
            <button onClick={handleDeleteClose}>Cancel</button>
            <button onClick={confirmDelete} className="bg-red-500 text-white px-3 py-1">Delete</button>
          </div>
        </div>
      </Popover>
    </motion.div>
  );
}