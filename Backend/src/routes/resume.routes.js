const express = require("express");
const multer = require("multer");
const router = express();
const resumeController = require("../controllers/resume.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const upload = multer({ storage: multer.memoryStorage() });

// POST/api/admin/resume
router.post(
    "/",
    authMiddleware,
    upload.single("resume"),
    resumeController.uploadResume
);

// GET/api/admin/resume
router.get("/", resumeController.getResume);

// DELETE /api/admin/resume
router.delete("/", authMiddleware, resumeController.deleteResume);

module.exports = router;
