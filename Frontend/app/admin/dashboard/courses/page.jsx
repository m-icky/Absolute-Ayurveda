"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit, FiTrash2, FiX } from "react-icons/fi";
import { Popover } from "@mui/material";

export default function CoursesManagement() {
  const [courses, setCourses] = useState([
    { id: 1, title: "Ayurvedic Lifestyle Counselor", duration: "6 Months", level: "Beginner", status: "Open" },
    { id: 2, title: "Panchakarma Therapist Training", duration: "1 Year", level: "Advanced", status: "Open" },
    { id: 3, title: "Introduction to Ayurveda", duration: "4 Weeks", level: "Beginner", status: "Closed" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ title: "", duration: "", level: "Beginner", status: "Open" });

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
    setFormData({ title: "", duration: "", level: "Beginner", status: "Open" });
    setIsModalOpen(true);
  };

  const handleEditClick = (course) => {
    setEditId(course.id);
    setFormData(course);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setCourses(courses.map((c) => c.id === editId ? { ...formData, id: editId } : c));
    } else {
      const newId = courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1;
      setCourses([...courses, { id: newId, ...formData }]);
    }
    setIsModalOpen(false);
    setFormData({ title: "", duration: "", level: "Beginner", status: "Open" });
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
          <h1 className="text-3xl font-playfair text-text mb-2">School of Ayurveda</h1>
          <p className="text-text-muted font-lato">Manage the courses offered by the school.</p>
        </div>
        <button onClick={handleAddClick} className="bg-olive hover:bg-olive-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-lato shadow-sm">
          <FiPlus /> Add New Course
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-cream/50 text-text-muted text-sm font-lato uppercase tracking-wider border-b border-border">
                <th className="px-6 py-4 font-semibold">Course Title</th>
                <th className="px-6 py-4 font-semibold">Duration</th>
                <th className="px-6 py-4 font-semibold">Level</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-cream/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-text">{course.title}</td>
                  <td className="px-6 py-4 text-text-muted">{course.duration}</td>
                  <td className="px-6 py-4 text-text-muted">{course.level}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      course.status === "Open" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-end gap-3">
                    <button onClick={() => handleEditClick(course)} className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                      <FiEdit size={18} />
                    </button>
                    <button aria-describedby={deletePopoverId} onClick={(e) => handleDeleteClick(e, course.id)} className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {courses.length === 0 && (
          <div className="p-8 text-center text-text-muted font-lato">
            No courses found. Add one to get started.
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
                <h2 className="text-xl font-playfair text-text">{editId ? "Edit Course" : "Add New Course"}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text transition-colors">
                  <FiX size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4 font-lato">
                <div>
                  <label className="block text-sm font-semibold text-text mb-1">Course Title</label>
                  <input required type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors" placeholder="e.g. Ayurveda Basics" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text mb-1">Duration</label>
                  <input required type="text" name="duration" value={formData.duration} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors" placeholder="e.g. 6 Months" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text mb-1">Level</label>
                  <select name="level" value={formData.level} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors">
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text mb-1">Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors">
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
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
          <p className="text-text mb-4">Are you sure you want to delete this course?</p>
          <div className="flex justify-end gap-2">
            <button onClick={handleDeleteClose} className="px-3 py-1.5 text-sm text-text hover:bg-cream/50 rounded-lg transition-colors">Cancel</button>
            <button onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-sm rounded-lg transition-colors">Delete</button>
          </div>
        </div>
      </Popover>
    </motion.div>
  );
}
