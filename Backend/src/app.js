const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const resumeRoutes = require("./routes/resume.routes");
const projectRoutes = require("./routes/project.routes");
const skillRoutes = require("./routes/skill.routes");
const honorRoutes = require("./routes/honor.routes");
const cors = require("cors");
const helmet = require("helmet");
const { generalLimiter } = require("./middlewares/rateLimiter");
const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL_WWW,
].filter(Boolean);

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
        methods: ["GET", "POST", "PATCH", "DELETE"],
    })
);

app.use((req, res, next) => {
    if (req.method === "GET") generalLimiter(req, res, next);
    else next();
});

// Routes
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Portfolio-Ambient's V2 server is up and running...",
    });
});

app.use("/api/admin/", userRoutes);
app.use("/api/admin/resume", resumeRoutes);
app.use("/api/admin/projects", projectRoutes);
app.use("/api/admin/skills", skillRoutes);
app.use("/api/admin/honors", honorRoutes);

module.exports = app;
