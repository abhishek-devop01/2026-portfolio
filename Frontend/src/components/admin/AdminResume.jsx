import React, { useEffect, useState } from "react";
import { Upload, FileText, Trash2, Eye } from "lucide-react";
import axios from "../../utils/axios";
import LoadingSpinner from "./LoadingSpinner";

const AdminResume = () => {
    const [resume, setResume] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        async function getResume() {
            try {
                setLoading(true);
                const response = await axios.get("/api/admin/resume", {
                    withCredentials: true,
                });
                setResume(response.data.resume);
            } catch (error) {
                console.error("Failed to fetch resume:", error);
            } finally {
                setLoading(false);
            }
        }

        getResume();
    }, []);

    const handleFileUpload = async (e) => {
        if (resume) {
            await axios.delete("/api/admin/resume", {
                withCredentials: true,
            });
            setResume(null);
        }

        const file = e.target.files[0];
        if (!file) return;

        // Validate file type (only PDF)
        if (file.type !== "application/pdf") {
            alert("Only PDF files are allowed!");
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("File size should be less than 5MB!");
            return;
        }

        setUploading(true);

        try {
            // 🧩 Prepare form data
            const formData = new FormData();
            formData.append("resume", file);
            formData.append("name", file.name);
            formData.append("size", (file.size / 1024).toFixed(2) + " KB");
            formData.append(
                "uploadDate",
                new Date().toLocaleDateString("en-GB")
            );

            // 🧩 Send multipart/form-data request
            const { data } = await axios.post("/api/admin/resume", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            setResume(data.resume);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload resume");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this resume?")) {
            try {
                setDeleting(true);
                await axios.delete("/api/admin/resume", {
                    withCredentials: true,
                });
                setResume(null);
            } catch (error) {
                console.error("Delete failed:", error);
                alert("Failed to delete resume");
            } finally {
                setDeleting(false);
            }
        }
    };

    const handleView = () => {
        window.open(resume.url, "_blank");
    };

    // Show loading spinner while fetching initial data
    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center min-h-[400px]">
                <LoadingSpinner size="lg" text="Loading resume data..." />
            </div>
        );
    }

    return (
        <div className="w-full h-full p-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Resume Management
                    </h1>
                    <p className="text-white/60">
                        Upload and manage your resume (PDF only)
                    </p>
                </div>
            </div>

            {/* Upload Area */}
            {!resume ? (
                <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center hover:border-[#EF6A93] transition-colors">
                    <input
                        type="file"
                        id="resume-upload"
                        className="hidden"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        disabled={uploading}
                    />
                    <label
                        htmlFor="resume-upload"
                        className="cursor-pointer flex flex-col items-center gap-4"
                    >
                        <div className="w-20 h-20 rounded-full bg-[#EF6A93]/10 flex items-center justify-center">
                            <Upload className="w-10 h-10 text-[#EF6A93]" />
                        </div>
                        {uploading ? (
                            <div className="flex flex-col items-center gap-2">
                                <LoadingSpinner size="md" />
                                <p className="text-lg text-white">
                                    Uploading...
                                </p>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <p className="text-xl font-semibold text-white mb-2">
                                        Click to upload your resume
                                    </p>
                                    <p className="text-white/60">
                                        PDF only (Max 5MB)
                                    </p>
                                </div>
                                <span className="px-8 py-3 bg-[#EF6A93] rounded-lg hover:bg-[#EF6A93]/80 transition-colors font-semibold inline-block">
                                    Choose File
                                </span>
                            </>
                        )}
                    </label>
                </div>
            ) : (
                /* Resume Card */
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                    <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-xl bg-[#EF6A93]/20 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-8 h-8 text-[#EF6A93]" />
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white mb-2">
                                {resume.name}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-white/60">
                                <span>Size: {resume.size}</span>
                                <span>•</span>
                                <span>Uploaded: {resume.uploadDate}</span>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 mt-4">
                                <button
                                    onClick={handleView}
                                    className="px-4 py-2 cursor-pointer bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center gap-2"
                                    disabled={deleting}
                                >
                                    <Eye className="w-4 h-4" />
                                    Preview
                                </button>

                                <button
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    className="px-4 py-2 cursor-pointer bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {deleting ? (
                                        <>
                                            <LoadingSpinner
                                                size="sm"
                                                color="#f87171"
                                            />
                                            <span>Deleting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className="flex-shrink-0">
                            <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                                Active
                            </span>
                        </div>
                    </div>

                    {/* Replace Option */}
                    <div className="mt-6 pt-6 border-t border-white/10">
                        <label
                            htmlFor="resume-replace"
                            className={`inline-flex items-center gap-2 px-6 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors ${
                                uploading || deleting
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer"
                            }`}
                        >
                            <Upload className="w-4 h-4" />
                            Replace Resume
                        </label>
                        <input
                            type="file"
                            id="resume-replace"
                            className="hidden"
                            accept=".pdf"
                            onChange={handleFileUpload}
                            disabled={uploading || deleting}
                        />
                    </div>
                </div>
            )}

            {/* Info Box */}
            <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-sm text-blue-400">
                    <strong>Note:</strong> Only one resume can be active at a
                    time. Uploading a new resume will replace the existing one.
                </p>
            </div>
        </div>
    );
};

export default AdminResume;
