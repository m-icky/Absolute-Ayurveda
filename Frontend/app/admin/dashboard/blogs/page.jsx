"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit, FiTrash2, FiX, FiUploadCloud, FiEye, FiHeart, FiUser } from "react-icons/fi";
import { Popover } from "@mui/material";
import Preloader from "@/components/Preloader";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/blogs/`;

export default function BlogsManagement() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    excerpt: "",
    content: "",
    author_name: "",
    date: "",
    views: "",
    likes: "",
    status: "active"
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const [deleteAnchorEl, setDeleteAnchorEl] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Failed to fetch blog posts:", error);
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
  const deletePopoverId = deleteOpen ? "delete-popover" : undefined;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      setSelectedAvatar(e.target.files[0]);
    }
  };

  const handleAddClick = () => {
    setEditId(null);
    setFormData({
      title: "",
      category: "",
      excerpt: "",
      content: "",
      author_name: "",
      date: "",
      views: "",
      likes: "",
      status: "active"
    });
    setSelectedImage(null);
    setSelectedAvatar(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (post) => {
    setEditId(post.id);
    setFormData({
      title: post.title,
      category: post.category,
      excerpt: post.excerpt || "",
      content: post.content || "",
      author_name: post.author_name || "Dr. Naveen Kumar",
      date: post.date || new Date().toISOString().split("T")[0],
      views: post.views || 0,
      likes: post.likes || 0,
      status: post.status || "active"
    });
    setSelectedImage(null);
    setSelectedAvatar(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append("title", formData.title);
    uploadData.append("category", formData.category);
    uploadData.append("excerpt", formData.excerpt);
    uploadData.append("content", formData.content);
    uploadData.append("author_name", formData.author_name);
    if (formData.date) {
      uploadData.append("date", formData.date);
    }
    uploadData.append("views", formData.views === "" ? 0 : formData.views);
    uploadData.append("likes", formData.likes === "" ? 0 : formData.likes);
    uploadData.append("status", formData.status);

    if (selectedImage) {
      uploadData.append("image", selectedImage);
    } else if (!editId) {
      alert("Please upload a featured image for the blog post.");
      return;
    }

    if (selectedAvatar) {
      uploadData.append("author_avatar", selectedAvatar);
    }

    try {
      const url = editId ? `${API_BASE_URL}${editId}/` : API_BASE_URL;
      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        body: uploadData,
      });

      if (response.ok) {
        const savedPost = await response.json();
        if (editId) {
          setPosts(posts.map((p) => (p.id === editId ? savedPost : p)));
        } else {
          setPosts([savedPost, ...posts]);
        }
        setIsModalOpen(false);
      } else {
        const err = await response.json();
        console.error("Failed to save blog post:", err);
        alert("Error saving blog post: " + JSON.stringify(err));
      }
    } catch (error) {
      console.error("Error saving blog post:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}${id}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts(posts.filter((p) => p.id !== id));
      } else {
        console.error("Failed to delete blog post");
      }
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  const getImageUrl = (path) => {
    if (!path) return "";
    return path.startsWith("http") ? path : `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`;
  };

  return (
    <>
      <Preloader isLoading={loading} isFullPage={false} />
      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pb-10 font-lato"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-playfair text-text mb-2">Ayurveda Chronicles</h1>
              <p className="text-text-muted">Create, edit, and manage articles published on the blog page.</p>
            </div>
            <button
              onClick={handleAddClick}
              className="bg-olive hover:bg-olive-dark text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all font-semibold shadow-sm text-sm"
            >
              <FiPlus /> Add New Article
            </button>
          </div>

          {/* Table container */}
          <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-cream/50 text-text-muted text-xs uppercase tracking-wider border-b border-border">
                    <th className="px-6 py-4 font-semibold w-24">Image</th>
                    <th className="px-6 py-4 font-semibold w-1/4">Title & Slug</th>
                    <th className="px-6 py-4 font-semibold">Category</th>
                    <th className="px-6 py-4 font-semibold">Author</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Metrics</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-cream/10 transition-colors text-sm">
                      {/* Blog post Image */}
                      <td className="px-6 py-4">
                        {post.image ? (
                          <img
                            src={getImageUrl(post.image)}
                            alt={post.title}
                            className="w-16 h-12 rounded object-cover border border-border"
                          />
                        ) : (
                          <div className="w-16 h-12 rounded bg-cream/50 border border-border flex items-center justify-center text-xs text-text-muted">
                            No Img
                          </div>
                        )}
                      </td>

                      {/* Title & Slug */}
                      <td className="px-6 py-4">
                        <div className="font-semibold text-text line-clamp-1" title={post.title}>
                          {post.title}
                        </div>
                        <div className="text-[11px] text-text-muted font-mono leading-none mt-1">
                          /{post.slug}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="bg-[#6b7c5b]/10 text-[#6b7c5b] text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded">
                          {post.category}
                        </span>
                      </td>

                      {/* Author */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={post.author?.avatar || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100"}
                            alt={post.author?.name}
                            className="w-6 h-6 rounded-full object-cover border border-white"
                          />
                          <span className="font-medium text-text-muted text-xs">
                            {post.author?.name || post.author_name}
                          </span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-text-muted whitespace-nowrap">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric"
                        })}
                      </td>

                      {/* Metrics (Views & Likes) */}
                      <td className="px-6 py-4 text-text-muted whitespace-nowrap">
                        <div className="flex flex-col gap-1 text-xs">
                          <span className="flex items-center gap-1.5">
                            <FiEye size={13} className="text-gray-400" /> {post.views}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <FiHeart size={13} className="text-red-400" /> {post.likes}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            post.status?.toLowerCase() === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 flex justify-end gap-3 whitespace-nowrap">
                        <button
                          onClick={() => handleEditClick(post)}
                          className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          aria-describedby={deletePopoverId}
                          onClick={(e) => handleDeleteClick(e, post.id)}
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

            {posts.length === 0 && (
              <div className="p-12 text-center text-text-muted font-lato">
                No blog posts found. Click "Add New Article" to write your first piece!
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
                  className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-y-auto max-h-[90vh]"
                >
                  <div className="flex justify-between items-center p-6 border-b border-border sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-playfair text-text">
                      {editId ? "Edit Article" : "Write New Article"}
                    </h2>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-text-muted hover:text-text transition-colors"
                    >
                      <FiX size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="p-6 space-y-4 font-lato">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Title */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-text mb-1">
                          Article Title
                        </label>
                        <input
                          required
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors text-sm"
                          placeholder="Panchakarma: The Ultimate Ayurvedic Detoxification"
                        />
                      </div>

                      {/* Category */}
                      <div>
                        <label className="block text-sm font-semibold text-text mb-1">
                          Category
                        </label>
                        <input
                          required
                          type="text"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors text-sm"
                          placeholder="e.g. Panchakarma or Yoga & Meditation"
                        />
                      </div>

                      {/* Publish Date */}
                      <div>
                        <label className="block text-sm font-semibold text-text mb-1">
                          Publish Date
                        </label>
                        <input
                          required
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors text-sm"
                        />
                      </div>

                      {/* Author Name */}
                      <div>
                        <label className="block text-sm font-semibold text-text mb-1">
                          Author Name
                        </label>
                        <input
                          required
                          type="text"
                          name="author_name"
                          value={formData.author_name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors text-sm"
                          placeholder="Dr. Naveen Kumar"
                        />
                      </div>

                      {/* Author Avatar Upload */}
                      <div>
                        <label className="block text-sm font-semibold text-text mb-1">
                          Author Avatar
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer bg-white border border-dashed border-olive p-2 rounded-lg hover:bg-olive/5 transition-colors text-sm">
                          <FiUploadCloud className="text-olive" size={16} />
                          <span className="text-xs text-text-muted truncate">
                            {selectedAvatar ? selectedAvatar.name : "Upload author picture..."}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Featured Image */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-text mb-1">
                          Featured Image {editId && "(Optional to replace)"}
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer bg-white border border-dashed border-olive p-3 rounded-lg hover:bg-olive/5 transition-colors text-sm">
                          <FiUploadCloud className="text-olive" size={20} />
                          <span className="text-xs text-text-muted">
                            {selectedImage ? selectedImage.name : "Choose article banner image..."}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="block text-sm font-semibold text-text mb-1">
                        Short Excerpt (Summary Card Text)
                      </label>
                      <textarea
                        required
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleInputChange}
                        rows="2"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors text-sm"
                        placeholder="A concise, engaging 1-2 sentence description of the article..."
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <label className="block text-sm font-semibold text-text mb-1">
                        Full Article Content
                      </label>
                      <textarea
                        required
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        rows="6"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors text-sm font-sans"
                        placeholder="Write the full body of the article here. You can use markdown or standard paragraphs..."
                      />
                    </div>

                    {/* Views & Likes */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-text mb-1">
                          Mock Views Count
                        </label>
                        <input
                          type="number"
                          name="views"
                          value={formData.views}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors text-sm"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-text mb-1">
                          Mock Likes Count
                        </label>
                        <input
                          type="number"
                          name="likes"
                          value={formData.likes}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors text-sm"
                          min="0"
                        />
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block text-sm font-semibold text-text mb-1">
                        Publishing Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-olive transition-colors text-sm"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-border">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 text-text hover:bg-cream/50 rounded-lg transition-colors text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-olive hover:bg-olive-dark text-white px-5 py-2 rounded-lg transition-colors text-sm font-semibold"
                      >
                        Save Article
                      </button>
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
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <div className="p-4 font-lato text-sm">
              <p className="text-text mb-4">Are you sure you want to delete this article?</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleDeleteClose}
                  className="px-3 py-1.5 text-xs text-text hover:bg-cream/50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-xs rounded-lg transition-colors"
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
