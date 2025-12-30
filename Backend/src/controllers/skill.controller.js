const { default: mongoose } = require("mongoose");
const skillModel = require("../models/skill.model");

async function addSkills(req, res) {
    const { title, icon, content } = req.body;

    if (!title || !icon || !content || content.length === 0) {
        return res.status(409).json({
            message: "Title, icon, and at least one section are required",
        });
    }

    const isSkillExists = await skillModel.findOne({ title });

    if (isSkillExists) {
        return res
            .status(409)
            .json({ message: "Skill with this title already exists" });
    }

    const skill = await skillModel.create({
        user: req.user.id,
        title,
        icon,
        content,
    });

    res.status(201).json({
        message: "Skill added successfully",
        skill,
    });
}

async function getSkills(req, res) {
    const skills = await skillModel.find();

    res.status(200).json({
        message: "Skills fetched successfully",
        skills: skills ? skills : [],
    });
}

async function updateSkills(req, res) {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(403).json({ message: "Invalid Skill id!" });
    }

    const isSkillExists = await skillModel.findById(id);

    if (!isSkillExists) {
        return res.status(404).json({ message: "No skill found" });
    }

    const { title, icon, content } = req.body;

    const updateData = {};

    if (title !== undefined && title !== "") updateData.title = title;
    if (icon !== undefined && icon !== "") updateData.icon = icon;
    if (content !== undefined && content !== "") updateData.content = content;

    const updatedSkill = await skillModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        message: "Skill updated sucessfully",
        updatedSkill,
    });
}

async function deleteSkills(req, res) {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(403).json({ message: "Invalid skill id" });
    }

    const isSkillExists = await skillModel.findById(id);

    if (!isSkillExists) {
        return res.status(404).json({ message: "Skill not found" });
    }

    await skillModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Skill deleted sucessfully" });
}

module.exports = {
    addSkills,
    getSkills,
    updateSkills,
    deleteSkills,
};
