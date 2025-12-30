import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X, Upload, ExternalLink } from "lucide-react";
import axios from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import {
    addProject,
    deleteProject,
    setProjects,
    updateProject,
} from "../../store/slices/ProjectSlice";

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setValues(initialValues);
    };

    const setFormValues = (newValues) => {
        setValues(newValues);
    };

    return { values, handleChange, resetForm, setFormValues };
};

const AdminProjects = () => {
    const dispatch = useDispatch();

    const { projects } = useSelector((state) => state.projects);

    const [selectedFile, setSelectedFile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    const {
        values: formData,
        handleChange,
        resetForm,
        setFormValues,
    } = useForm({
        thumbnail: "",
        title: "",
        year: "",
        role: "",
        link: "",
    });

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const openModal = (project = null) => {
        if (project) {
            setEditingProject(project);
            setFormValues(project);
            setPreviewImage(project.thumbnail);
        } else {
            setEditingProject(null);
            resetForm();
            setPreviewImage("");
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProject(null);
        resetForm();
        setPreviewImage("");
    };

    useEffect(() => {
        async function getProjects() {
            const res = await axios.get("/api/admin/projects", {
                withCredentials: true,
            });

            dispatch(setProjects(res.data.projects));
        }

        getProjects();
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 🧱 Build multipart form data
            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title);
            formDataToSend.append("year", formData.year);
            formDataToSend.append("role", formData.role);
            formDataToSend.append("link", formData.link || "");

            if (selectedFile) {
                formDataToSend.append("thumbnail", selectedFile);
            }

            if (editingProject) {
                // 🔄 Update existing project
                const res = await axios.patch(
                    `/api/admin/projects/${editingProject._id}`,
                    formDataToSend,
                    {
                        withCredentials: true,
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );

                dispatch(updateProject(res.data.project));
            } else {
                // 🆕 Create new project
                const res = await axios.post(
                    "/api/admin/projects",
                    formDataToSend,
                    {
                        withCredentials: true,
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );
                dispatch(addProject(res.data.project));
            }

            closeModal();
        } catch (error) {
            console.error("Error uploading project:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you want to delete this project?")) {
            await axios.delete(`/api/admin/projects/${id}`, {
                withCredentials: true,
            });

            dispatch(deleteProject(id));
        }
    };

    return (
        <div className="w-full min-h-full bg-[#1a1a1a] p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">
                            Manage Projects
                        </h1>
                        <p className="text-gray-400">
                            Upload and manage your portfolio projects
                        </p>
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="flex items-center cursor-pointer gap-2 px-6 py-3 bg-[#EF6A93] rounded-lg hover:bg-[#EF6A93]/80 transition-colors text-white font-medium"
                    >
                        <Plus size={20} />
                        Add New Project
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            className="group relative bg-[#252525] rounded-lg overflow-hidden hover:bg-[#2a2a2a] transition-all duration-300"
                        >
                            <div className="relative h-48 overflow-hidden bg-[#1f1f1f]">
                                <img
                                    src={
                                        project.thumbnail ||
                                        "./images/comingsoon.webp"
                                    }
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute top-3 right-3 p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors"
                                    >
                                        <ExternalLink
                                            size={16}
                                            className="text-white"
                                        />
                                    </a>
                                )}
                            </div>

                            <div className="p-5">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-xl font-semibold text-white">
                                        {project.title}
                                    </h3>
                                    <span className="px-3 py-1 bg-[#EF6A93]/20 text-[#EF6A93] rounded-full text-sm font-medium">
                                        {project.year}
                                    </span>
                                </div>

                                <p className="text-gray-400 text-sm mb-4">
                                    {project.role}
                                </p>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openModal(project)}
                                        className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-[#3a3a3a] text-gray-300 rounded-lg hover:bg-[#404040] transition-colors"
                                    >
                                        <Edit2 size={16} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDelete(project._id)
                                        }
                                        className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {projects.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 mx-auto mb-4 bg-[#252525] rounded-full flex items-center justify-center">
                            <Plus size={40} className="text-gray-500" />
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-2">
                            No projects yet
                        </h3>
                        <p className="text-gray-400 mb-6">
                            Start by adding your first project
                        </p>
                        <button
                            onClick={() => openModal()}
                            className="px-6 py-3 bg-[#EF6A93] rounded-lg hover:bg-[#EF6A93]/80 transition-colors text-white font-medium"
                        >
                            Add Project
                        </button>
                    </div>
                )}

                {isModalOpen && (
                    <div className="fixed h-full inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-[#1f1f1f] parent rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl">
                            <div className="sticky z-30 top-0 bg-[#1f1f1f] border-b border-[#2a2a2a] p-6 flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-white">
                                    {editingProject
                                        ? "Edit Project"
                                        : "Add New Project"}
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors"
                                >
                                    <X size={24} className="text-gray-400" />
                                </button>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="p-6 space-y-6"
                            >
                                <div>
                                    <label className="block text-gray-300 mb-2 font-medium">
                                        Thumbnail Image
                                    </label>
                                    <div className="relative">
                                        {previewImage ? (
                                            <div className="relative w-full h-48 rounded-lg overflow-hidden group">
                                                <img
                                                    src={previewImage}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <label className="cursor-pointer px-4 py-2 bg-[#EF6A93] rounded-lg hover:bg-[#EF6A93]/80 transition-colors text-white">
                                                        Change Image
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={
                                                                handleImageUpload
                                                            }
                                                            className="hidden"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        ) : (
                                            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#EF6A93] rounded-lg cursor-pointer hover:border-[#EF6A93]/70 transition-colors bg-[#252525]">
                                                <div className="w-16 h-16 rounded-full bg-[#EF6A93]/10 flex items-center justify-center mb-3">
                                                    <Upload
                                                        size={32}
                                                        className="text-[#EF6A93]"
                                                    />
                                                </div>
                                                <span className="text-white font-medium mb-1">
                                                    Click to upload your
                                                    thumbnail
                                                </span>
                                                <span className="text-gray-400 text-sm">
                                                    PNG, JPG (Max 5MB)
                                                </span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                />
                                            </label>
                                        )}
                                    </div>
                                </div>

                                {/* Title */}
                                <div>
                                    <label className="block text-gray-300 mb-2 font-medium">
                                        Project Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-[#252525] border border-[#3a3a3a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#EF6A93] transition-colors"
                                        placeholder="Enter project title"
                                    />
                                </div>

                                {/* Year */}
                                <div>
                                    <label className="block text-gray-300 mb-2 font-medium">
                                        Year *
                                    </label>
                                    <input
                                        type="text"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-[#252525] border border-[#3a3a3a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#EF6A93] transition-colors"
                                        placeholder="2024"
                                    />
                                </div>

                                {/* Role */}
                                <div>
                                    <label className="block text-gray-300 mb-2 font-medium">
                                        Your Role *
                                    </label>
                                    <input
                                        type="text"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-[#252525] border border-[#3a3a3a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#EF6A93] transition-colors"
                                        placeholder="e.g., Lead Developer, Designer"
                                    />
                                </div>

                                {/* Link */}
                                <div>
                                    <label className="block text-gray-300 mb-2 font-medium">
                                        Project Link
                                    </label>
                                    <input
                                        type="url"
                                        name="link"
                                        value={formData.link}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#252525] border border-[#3a3a3a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#EF6A93] transition-colors"
                                        placeholder="https://example.com"
                                    />
                                </div>

                                {/* Note */}
                                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                                    <p className="text-blue-400 text-sm">
                                        <span className="font-semibold">
                                            Note:
                                        </span>{" "}
                                        All fields marked with * are required.
                                        Make sure to add a high-quality
                                        thumbnail image.
                                    </p>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 px-6 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white hover:bg-[#333333] transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-[#EF6A93] rounded-lg hover:bg-[#EF6A93]/80 transition-colors text-white font-medium"
                                    >
                                        {editingProject
                                            ? "Update Project"
                                            : "Add Project"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProjects;
