const resumeModel = require("../models/resume.model");
const uploadFile = require("../services/storage.service");

async function uploadResume(req, res) {
    const file = await uploadFile(req.file);
    const { name, size, uploadDate } = req.body;

    const resume = await resumeModel.create({
        user: req.user.id,
        name,
        size,
        uploadDate,
        url: file.url,
    });

    res.status(201).json({ message: "pdf uploaded sucessfully", resume });
}

async function getResume(req, res) {
    const resume = await resumeModel.findOne({});
    if (!resume) {
        return res
            .status(404)
            .json({ message: "No resume found! Please upload one" });
    }

    res.status(200).json({
        message: "User's resume fetched sucessfully",
        resume,
    });
}

async function deleteResume(req, res) {
    const resume = await resumeModel.findOneAndDelete({ user: req.user.id });

    if (!resume) {
        return res.status(404).json({ message: "No resume found to delete!" });
    }

    res.status(200).json({ message: "Current Resume deleted!" });
}

module.exports = {
    uploadResume,
    getResume,
    deleteResume,
};
