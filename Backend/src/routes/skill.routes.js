const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const skillController = require("../controllers/skill.controller");

const router = express.Router();

// POST /api/admin/skills
router.post("/", authMiddleware, skillController.addSkills);

// GET /api/admin/skills
router.get("/", skillController.getSkills);

// PATCH /api/admin/skills/:id
router.patch("/:id", authMiddleware, skillController.updateSkills);

// DELETE /api/admin/skills/:id
router.delete("/:id", authMiddleware, skillController.deleteSkills);

module.exports = router;
