import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash2, Edit2, Code2 } from "lucide-react";
import axios from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import {
    addSkill,
    deleteSkill,
    setSkills,
    updateSkill,
} from "../../store/slices/SkillsSlice";

const AdminSkill = () => {
    const dispatch = useDispatch();
    const { skills } = useSelector((state) => state.skills);

    const [editingId, setEditingId] = useState(null);

    const { register, control, handleSubmit, reset, setValue } = useForm({
        defaultValues: {
            title: "",
            icon: "",
            content: [{ section: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "content",
    });

    useEffect(() => {
        async function getSkills() {
            const res = await axios.get("/api/admin/skills", {
                withCredentials: true,
            });

            dispatch(setSkills(res.data.skills));
        }

        getSkills();
    }, [dispatch]);

    const onSubmit = async (data) => {
        if (editingId) {
            try {
                const res = await axios.patch(
                    `/api/admin/skills/${editingId}`,
                    data,
                    { withCredentials: true }
                );

                dispatch(updateSkill(res.data.updatedSkill));
            } catch (error) {
                console.log("Error editing skills:", error);
            } finally {
                setEditingId(null);
            }
        } else {
            try {
                const res = await axios.post("/api/admin/skills", data, {
                    withCredentials: true,
                });

                dispatch(addSkill(res.data.skill));
            } catch (err) {
                console.log("Error uploading skills: ", err);
            }
        }
        reset();
    };

    const handleEdit = async (skill) => {
        setEditingId(skill._id);
        setValue("title", skill.title);
        setValue("icon", skill.icon);
        setValue("content", skill.content);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this skill?")) {
            try {
                await axios.delete(`/api/admin/skills/${id}`, {
                    withCredentials: true,
                });

                dispatch(deleteSkill(id));
            } catch (error) {
                console.log("Error deleting skill", error);
            }
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
    };

    return (
        <div className="w-full h-full p-6 ">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Skills Management
                    </h1>
                    <p className="text-white/60">
                        Manage your technical skills and expertise
                    </p>
                </div>
            </div>

            {/* Form Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Code2 className="w-6 h-6 text-[#EF6A93]" />
                    {editingId ? "Edit Skill" : "Add New Skill"}
                </h2>

                <div className="space-y-4">
                    {/* Title Input */}
                    <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                            Skill Title
                        </label>
                        <input
                            {...register("title", { required: true })}
                            type="text"
                            placeholder="e.g., Frontend Development"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#EF6A93] transition-colors"
                        />
                    </div>

                    {/* Icon Input */}
                    <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                            Icon Class
                        </label>
                        <input
                            {...register("icon", { required: true })}
                            type="text"
                            placeholder="e.g., ri-flask-line"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#EF6A93] transition-colors"
                        />
                    </div>

                    {/* Content Sections */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-white/80 text-sm font-medium">
                                Skill Sections
                            </label>
                            <button
                                type="button"
                                onClick={() => append({ section: "" })}
                                className="text-sm text-[#EF6A93] cursor-pointer hover:text-[#EF6A93]/80 flex items-center gap-1"
                            >
                                <Plus className="w-4 h-4" />
                                Add Section
                            </button>
                        </div>

                        <div className="space-y-2">
                            {fields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        {...register(
                                            `content.${index}.section`,
                                            { required: true }
                                        )}
                                        type="text"
                                        placeholder="e.g., HTML"
                                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#EF6A93] transition-colors"
                                    />
                                    {fields.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="p-3 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleFormSubmit}
                            className="px-6 py-3 bg-[#EF6A93] cursor-pointer rounded-lg hover:bg-[#EF6A93]/80 transition-colors font-semibold"
                        >
                            {editingId ? "Update Skill" : "Add Skill"}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={() => {
                                    reset();
                                    setEditingId(null);
                                }}
                                className="px-6 py-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Skills List */}
            <div className="space-y-4">
                {skills.map((skill) => (
                    <div
                        key={skill._id}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
                    >
                        <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div className="w-16 h-16 rounded-xl bg-[#EF6A93]/20 flex items-center justify-center flex-shrink-0">
                                <i
                                    className={`${skill.icon} text-2xl text-[#EF6A93]`}
                                ></i>
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {skill.title}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {skill.content.map((item, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-white/10 text-white/80 rounded text-sm"
                                        >
                                            {item.section}
                                        </span>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-3 mt-4">
                                    <button
                                        onClick={() => handleEdit(skill)}
                                        className="px-4 py-2 bg-blue-500/20 cursor-pointer text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center gap-2"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(skill._id)}
                                        className="px-4 cursor-pointer py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors flex items-center gap-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Info Box */}
            <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-sm text-blue-400">
                    <strong>Note:</strong> Skills will be displayed on your
                    portfolio's skills section. You can add unlimited skills and
                    sections.
                </p>
            </div>

            {/* RemixIcon CDN */}
            <link
                href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
                rel="stylesheet"
            />
        </div>
    );
};

export default AdminSkill;
