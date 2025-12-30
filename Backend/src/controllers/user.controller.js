const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Detect if production based on FRONTEND_URL
const isProduction = process.env.FRONTEND_URL?.includes("https://");

async function registerUser(req, res) {
    const { username, password } = req.body;
    const isUserExists = await userModel.findOne({ username });
    if (isUserExists) {
        return res.status(409).json({ message: "User already exists." });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        username,
        password: hashPassword,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        domain: isProduction ? ".satyakumarram.in" : undefined,
    });

    res.status(201).json({
        message: "User registered sucessfully",
        user,
    });
}

async function loginUser(req, res) {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username }).select("+password");
    if (!user) {
        return res.status(401).json({ message: "Invalid credientials" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(401).json({ message: "Invalid credientials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        domain: isProduction ? ".satyakumarram.in" : undefined,
    });

    res.status(200).json({
        message: "Logging successfully",
        user,
    });
}

async function getUser(req, res) {
    res.status(200).json({
        message: "User fetched sucessfully",
        user: req.user,
    });
}

async function logoutUser(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        domain: isProduction ? ".satyakumarram.in" : undefined,
    });
    res.status(200).json({ message: "Logged out" });
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    logoutUser,
};
