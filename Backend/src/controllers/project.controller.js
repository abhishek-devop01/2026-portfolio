const { default: mongoose } = require("mongoose");
const projectModel = require("../models/projects.model");
const uploadFile = require("../services/storage.service");

async function uploadProjects(req, res) {
    try {
        const user = req.user;
        const { year, link, role, title } = req.body;

        // Check if title already exists
        const isTitleExists = await projectModel.findOne({ title });
        if (isTitleExists) {
            return res.status(409).json({ message: "Title already exists!" });
        }

        let uploadedThumbnail;
        // Fix: Check req.file, not thumbnail from body
        if (req.file) {
            uploadedThumbnail = await uploadFile(req.file);
        }

        const project = await projectModel.create({
            user: user.id,
            title,
            year,
            link,
            role,
            thumbnail: uploadedThumbnail ? uploadedThumbnail.url : "",
        });

        res.status(201).json({
            message: "Project uploaded successfully",
            project,
        });
    } catch (error) {
        console.error("Error uploading project:", error);
        res.status(500).json({
            message: "Error uploading project",
            error: error.message,
        });
    }
}

async function getProjects(req, res) {
    try {
        const projects = await projectModel.find();

        res.status(200).json({
            message: "Projects fetched successfully",
            projects: projects ? projects : [],
        });
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({
            message: "Error fetching projects",
            error: error.message,
        });
    }
}

async function updateProject(req, res) {
    try {
        const { id } = req.params;

        // Correct ObjectId validation
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid project ID" });
        }

        // Check if project exists
        const existingProject = await projectModel.findById(id);
        if (!existingProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        const { year, link, role, title } = req.body;

        // Prepare update object - only include fields that are provided
        const updateData = {};

        if (title !== undefined && title !== "") updateData.title = title;
        if (role !== undefined && role !== "") updateData.role = role;
        if (year !== undefined && year !== "") updateData.year = year;
        if (link !== undefined) updateData.link = link;

        // Handle thumbnail upload if new file is provided
        if (req.file) {
            const uploadedThumbnail = await uploadFile(req.file);
            updateData.thumbnail = uploadedThumbnail.url;
        }

        // Update project with only the fields that changed
        const updatedProject = await projectModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "Project updated successfully",
            project: updatedProject,
        });
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({
            message: "Error updating project",
            error: error.message,
        });
    }
}

async function deleteProject(req, res) {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid project ID" });
        }

        // Check if project exists before deleting
        const project = await projectModel.findById(id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Delete the project
        await projectModel.findByIdAndDelete(id);

        res.status(200).json({
            message: "Project deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({
            message: "Error deleting project",
            error: error.message,
        });
    }
}

module.exports = {
    uploadProjects,
    getProjects,
    updateProject,
    deleteProject,
};
