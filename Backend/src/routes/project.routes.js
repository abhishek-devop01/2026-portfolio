const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const projectController = require("../controllers/project.controller");
const multer = require("multer");
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// POST /api/admin/projects
router.post(
    "/",
    authMiddleware,
    upload.single("thumbnail"),
    projectController.uploadProjects
);

// GET /api/admin/projects
router.get("/", projectController.getProjects);

// PATCH /api/admin/projects/:id
router.patch(
    "/:id",
    authMiddleware,
    upload.single("thumbnail"),
    projectController.updateProject
);

// DELETE /api/admin/projects/:id
router.delete("/:id", authMiddleware, projectController.deleteProject);

module.exports = router;
