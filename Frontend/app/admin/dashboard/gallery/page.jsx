"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUploadCloud, FiTrash2, FiX, FiImage } from "react-icons/fi";
import { Popover } from "@mui/material";
import Preloader from "@/components/Preloader";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/gallery/`;

export default function GalleryManagement() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 1. Updated formData to use description instead of category
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const [deleteAnchorEl, setDeleteAnchorEl] = useState(null);
  const [imgToDelete, setImgToDelete] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch (error) {
      console.error("Failed to fetch images:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const processFile = (file) => {
    if (file) {
      if (file.type.startsWith("image/")) {
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        alert("Please upload an image file.");
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert("Please select an image to upload.");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("title", formData.title);
    // 2. Append description instead of category
    uploadData.append("description", formData.description);
    uploadData.append("image", selectedFile);

    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        body: uploadData, 
      });

      if (response.ok) {
        const newImage = await response.json();
        setImages([newImage, ...images]); 
        setIsModalOpen(false);
        // Reset state
        setFormData({ title: "", description: "" });
        setSelectedFile(null);
        setPreviewUrl("");
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}${id}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        setImages(images.filter((img) => img.id !== id));
      } else {
        console.error("Failed to delete image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
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
          <h1 className="text-3xl font-playfair text-text mb-2">Gallery Images</h1>
          <p className="text-text-muted font-lato">Manage images for the gallery.</p>
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
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-border group relative flex flex-col"
          >
            <div className="h-48 bg-cream/50 flex items-center justify-center p-4 relative overflow-hidden shrink-0">
               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                 <button 
                   aria-describedby={deletePopoverId} 
                   onClick={(e) => handleDeleteClick(e, img.id)} 
                   className="bg-white text-red-500 hover:text-red-700 p-3 rounded-full shadow-lg transform hover:scale-110 transition-transform"
                 >
                   <FiTrash2 size={20} />
                 </button>
               </div>
               {/* Prepend domain if relative URL from Django */}
               <img 
                 src={img.image?.startsWith('http') ? img.image : `${process.env.NEXT_PUBLIC_SERVER_URL}${img.image}`} 
                 alt={img.title} 
                 className="max-h-full object-contain" 
               />
            </div>
            
            <div className="p-4 border-t border-border flex-1">
              <h3 className="font-semibold text-text truncate">{img.title}</h3>
              {/* Display the description. Added a line-clamp so long texts don't break the card size */}
              {img.description && (
                <p className="text-sm text-text-muted font-lato mt-1 line-clamp-2" title={img.description}>
                  {img.description}
                </p>
              )}
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
                
                {/* 3. Replaced Category select with Description textarea */}
                <div>
                  <label className="block text-sm font-semibold text-text mb-1">Description (Optional)</label>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    rows="2"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors resize-none" 
                    placeholder="Short description of the image..." 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text mb-1">Upload Image</label>
                  <div className="flex items-center gap-4">
                    <label 
                      onDragOver={handleDragOver}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`flex-1 cursor-pointer bg-white border border-dashed p-4 rounded-lg text-center transition-all duration-200 ${
                        isDragging 
                          ? "border-olive bg-olive/10 border-solid scale-[1.02] shadow-sm" 
                          : "border-olive hover:bg-olive/5"
                      }`}
                    >
                      <FiUploadCloud className={`mx-auto mb-2 transition-transform duration-200 ${isDragging ? "scale-110 text-olive-dark" : "text-olive"}`} size={24} />
                      <span className="text-sm text-text-muted font-lato block">
                        {isDragging ? (
                          <span className="text-olive font-semibold">Drop the image here!</span>
                        ) : selectedFile ? (
                          <span className="text-olive font-semibold">{selectedFile.name}</span>
                        ) : (
                          <>
                            Drag &amp; drop here, or{" "}
                            <span className="text-olive font-semibold underline">browse</span>
                          </>
                        )}
                      </span>
                      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    </label>
                    {previewUrl && (
                      <div className="w-16 h-16 rounded-lg border border-border overflow-hidden shrink-0">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
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
      )}
    </>
  );
}