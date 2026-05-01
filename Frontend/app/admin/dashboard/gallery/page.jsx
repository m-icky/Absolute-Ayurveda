"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUploadCloud, FiTrash2, FiX, FiImage } from "react-icons/fi";
import { Popover } from "@mui/material";

export default function GalleryManagement() {
  const [images, setImages] = useState([
    { id: 1, title: "Clinic Front", url: "/absoluteayur.png", category: "Facility" },
    { id: 2, title: "Healing Team", url: "/absoluteayur.png", category: "Team" },
    { id: 3, title: "Therapy Room", url: "/absoluteayur.png", category: "Facility" },
    { id: 4, title: "Yoga Session", url: "/absoluteayur.png", category: "Activities" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", category: "Facility" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [deleteAnchorEl, setDeleteAnchorEl] = useState(null);
  const [imgToDelete, setImgToDelete] = useState(null);

  const handleDeleteClick = (event, id) => {
    setDeleteAnchorEl(event.currentTarget);
    setImgToDelete(id);
  };

  const handleDeleteClose = () => {
    setDeleteAnchorEl(null);
    setImgToDelete(null);
  };

  const confirmDelete = () => {
    if (imgToDelete !== null) {
      handleDelete(imgToDelete);
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
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = images.length > 0 ? Math.max(...images.map((img) => img.id)) + 1 : 1;
    // Fallback to absoluteayur.png if no file is selected
    const finalUrl = previewUrl ? previewUrl : "/absoluteayur.png";
    setImages([...images, { id: newId, ...formData, url: finalUrl }]);
    setIsModalOpen(false);
    setFormData({ title: "", category: "Facility" });
    setSelectedFile(null);
    setPreviewUrl("");
  };

  const handleDelete = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-playfair text-text mb-2">Gallery & Team Images</h1>
          <p className="text-text-muted font-lato">Manage images for the gallery and healing team.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-olive hover:bg-olive-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-lato shadow-sm">
          <FiUploadCloud /> Upload New Image
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <motion.div
            key={img.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-border group relative"
          >
            {/* Using a placeholder styled div or the actual logo for now */}
            <div className="h-48 bg-cream/50 flex items-center justify-center p-4 relative overflow-hidden">
               {/* Overlay for delete action */}
               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                 <button 
                   aria-describedby={deletePopoverId} 
                   onClick={(e) => handleDeleteClick(e, img.id)} 
                   className="bg-white text-red-500 hover:text-red-700 p-3 rounded-full shadow-lg transform hover:scale-110 transition-transform"
                 >
                   <FiTrash2 size={20} />
                 </button>
               </div>
               {/* Actual Image */}
               <img src={img.url} alt={img.title} className="max-h-full object-contain" />
            </div>
            
            <div className="p-4 border-t border-border">
              <h3 className="font-semibold text-text truncate">{img.title}</h3>
              <p className="text-sm text-text-muted font-lato">{img.category}</p>
            </div>
          </motion.div>
        ))}
      </div>
      {images.length === 0 && (
        <div className="bg-white rounded-xl p-8 text-center text-text-muted border border-border font-lato">
          No images uploaded yet.
        </div>
      )}

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
              className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-border"
            >
              <div className="flex justify-between items-center p-6 border-b border-border">
                <h2 className="text-xl font-playfair text-text flex items-center gap-2">
                  <FiImage className="text-olive" /> Upload Image
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text transition-colors">
                  <FiX size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4 font-lato">
                <div>
                  <label className="block text-sm font-semibold text-text mb-1">Image Title</label>
                  <input required type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors" placeholder="e.g. Clinic Front View" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text mb-1">Upload Image</label>
                  <div className="flex items-center gap-4">
                    <label className="flex-1 cursor-pointer bg-white border border-dashed border-olive p-4 rounded-lg text-center hover:bg-olive/5 transition-colors">
                      <FiUploadCloud className="mx-auto text-olive mb-2" size={24} />
                      <span className="text-sm text-text-muted font-lato">{selectedFile ? selectedFile.name : "Click to select a file"}</span>
                      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    </label>
                    {previewUrl && (
                      <div className="w-16 h-16 rounded-lg border border-border overflow-hidden shrink-0">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text mb-1">Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors">
                    <option value="Facility">Facility</option>
                    <option value="Team">Team</option>
                    <option value="Activities">Activities</option>
                    <option value="Events">Events</option>
                  </select>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-text hover:bg-cream/50 rounded-lg transition-colors">Cancel</button>
                  <button type="submit" className="bg-olive hover:bg-olive-dark text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                    <FiUploadCloud /> Upload
                  </button>
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
          <p className="text-text mb-4">Are you sure you want to delete this image?</p>
          <div className="flex justify-end gap-2">
            <button onClick={handleDeleteClose} className="px-3 py-1.5 text-sm text-text hover:bg-cream/50 rounded-lg transition-colors">Cancel</button>
            <button onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-sm rounded-lg transition-colors">Delete</button>
          </div>
        </div>
      </Popover>
    </motion.div>
  );
}
