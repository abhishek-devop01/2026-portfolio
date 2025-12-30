const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authMiddleware(req, res, next) {
    const { token } = req.cookies;

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(403).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token or expired" });
    }
}

module.exports = authMiddleware;
