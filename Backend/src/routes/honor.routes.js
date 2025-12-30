const express = require("express");
const honorController = require("../controllers/honor.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const validations = require("../middlewares/validator");
const multer = require("multer");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// POST /api/admin/honors
router.post(
    "/",
    authMiddleware,
    upload.single("certificate"),
    validations.honorValidator,
    honorController.addHonor
);

// GET /api/admin/honors
router.get("/", honorController.getHonor);

// PATCH /api/admin/honors/:id
router.patch(
    "/:id",
    authMiddleware,
    upload.single("certificate"),
    honorController.updateHonor
);

// DELETE /api/admin/honors/:id
router.delete("/:id", authMiddleware, honorController.deleteHonor);

module.exports = router;
