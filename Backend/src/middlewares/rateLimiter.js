const rateLimit = require("express-rate-limit");

// General limiter for all public GET requests
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200,
    message: {
        success: false,
        message: "Too many requests — please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { generalLimiter };
