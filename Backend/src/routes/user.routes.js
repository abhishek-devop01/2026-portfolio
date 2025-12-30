const express = require("express");
const userController = require("../controllers/user.controller");
const validation = require("../middlewares/validator");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// /api/admin/register
router.post("/register", validation.registerUser, userController.registerUser);

// /api/admin/login
router.post("/login", validation.loginUser, userController.loginUser);

router.get("/me", authMiddleware, userController.getUser);

//GET /api/admin/logout
router.get("/logout", userController.logoutUser);

module.exports = router;
