"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit, FiTrash2, FiX, FiUploadCloud } from "react-icons/fi";
import { Popover } from "@mui/material";
import Preloader from "@/components/Preloader";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/courses/`;

export default function CoursesManagement() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({ 
    title: "", 
    description: "", 
    duration: "", 
    level: "Beginner", 
    status: "Open" 
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const [deleteAnchorEl, setDeleteAnchorEl] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (response.ok) {
        const data = await response.json();
        setCourses(data); 
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAddClick = () => {
    setEditId(null);
    setFormData({ title: "", description: "", duration: "", level: "Beginner", status: "Open" });
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (course) => {
    setEditId(course.id);
    setFormData({
      title: course.title,
      description: course.description || "",
      duration: course.duration,
      level: course.level,
      status: course.status
    });
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const uploadData = new FormData();
    uploadData.append("title", formData.title);
    uploadData.append("description", formData.description);
    uploadData.append("duration", formData.duration);
    uploadData.append("level", formData.level);
    uploadData.append("status", formData.status);
    
    if (selectedFile) {
      uploadData.append("image", selectedFile);
    } else if (!editId) {
      alert("Please upload an image for the course.");
      return;
    }

    try {
      const url = editId ? `${API_BASE_URL}${editId}/` : API_BASE_URL;
      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        body: uploadData,
      });

      if (response.ok) {
        const savedCourse = await response.json();
        if (editId) {
          setCourses(courses.map((c) => c.id === editId ? savedCourse : c));
        } else {
          setCourses([savedCourse, ...courses]);
        }
        setIsModalOpen(false);
      } else {
        console.error("Failed to save course");
      }
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}${id}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCourses(courses.filter((c) => c.id !== id));
      } else {
        console.error("Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <>
      <Preloader isLoading={loading} isFullPage={false} />
      {!loading && (
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
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-cream/50 text-text-muted text-sm font-lato uppercase tracking-wider border-b border-border">
                {/* Separated Image and Title Headings */}
                <th className="px-6 py-4 font-semibold w-16">Image</th>
                <th className="px-6 py-4 font-semibold w-1/5">Course Title</th>
                <th className="px-6 py-4 font-semibold w-1/3">Description</th>
                <th className="px-6 py-4 font-semibold">Duration</th>
                <th className="px-6 py-4 font-semibold">Level</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-cream/20 transition-colors">
                  
                  {/* Image Column */}
                  <td className="px-6 py-4">
                    {course.image ? (
                       <img 
                         src={course.image.startsWith('http') ? course.image : `${process.env.NEXT_PUBLIC_SERVER_URL}${course.image}`} 
                         alt={course.title} 
                         className="w-12 h-12 rounded object-cover border border-border" 
                       />
                    ) : (
                       <div className="w-12 h-12 rounded bg-cream/50 border border-border flex items-center justify-center text-xs text-text-muted">Img</div>
                    )}
                  </td>

                  {/* Title Column */}
                  <td className="px-6 py-4 font-medium text-text">
                    <span className="truncate max-w-[180px] block">{course.title}</span>
                  </td>
                  
                  {/* Description Column */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-text-muted line-clamp-2 max-w-xs" title={course.description}>
                      {course.description || "No description provided."}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-text-muted whitespace-nowrap">{course.duration}</td>
                  <td className="px-6 py-4 text-text-muted whitespace-nowrap">{course.level}</td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      course.status?.toLowerCase() === "active" || course.status === "Open" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {course.status}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 flex justify-end gap-3 whitespace-nowrap">
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

      {/* --- FORM MODAL --- */}
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
              className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center p-6 border-b border-border sticky top-0 bg-white z-10">
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
                  <label className="block text-sm font-semibold text-text mb-1">Description</label>
                  <textarea required name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors" placeholder="Course description..."></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text mb-1">Course Image {editId && "(Optional to replace)"}</label>
                  <label className="flex items-center gap-2 cursor-pointer bg-white border border-dashed border-olive p-3 rounded-lg hover:bg-olive/5 transition-colors">
                    <FiUploadCloud className="text-olive" size={20} />
                    <span className="text-sm text-text-muted">{selectedFile ? selectedFile.name : "Choose an image file..."}</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-text mb-1">Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-border">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-text hover:bg-cream/50 rounded-lg transition-colors">Cancel</button>
                  <button type="submit" className="bg-olive hover:bg-olive-dark text-white px-4 py-2 rounded-lg transition-colors">Save Course</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DELETE POPOVER --- */}
      <Popover
        id={deletePopoverId}
        open={deleteOpen}
        anchorEl={deleteAnchorEl}
        onClose={handleDeleteClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
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
      )}
    </>
  );
}