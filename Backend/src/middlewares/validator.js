const { body, validationResult } = require("express-validator");

const respondWithValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Get the first error message for consistency with tests
        const firstError = errors.array()[0];
        return res.status(400).json({
            message: firstError.msg,
            errors: errors.array(), // Keep the full errors array for debugging
        });
    }
    next();
};

const registerUser = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isString()
        .withMessage("Username must be a string")
        .isLength({ min: 3, max: 20 })
        .withMessage("Username must be between 3 and 20 characters")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage(
            "Username can only contain letters, numbers, and underscores"
        ),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),

    respondWithValidationErrors,
];

const loginUser = [
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),

    respondWithValidationErrors,
];

const projectValidator = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Title must be 3-100 characters"),

    body("role")
        .trim()
        .notEmpty()
        .withMessage("Role is required")
        .isLength({ max: 50 })
        .withMessage("Role must be less than 50 characters"),

    body("year")
        .isInt({ min: 2003, max: new Date().getFullYear() + 1 })
        .withMessage("Year must be valid"),

    body("link").optional().isURL().withMessage("Link must be a valid URL"),

    respondWithValidationErrors,
];

const honorValidator = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Title must be 3-100 characters"),

    body("position")
        .trim()
        .notEmpty()
        .withMessage("Position is required")
        .isLength({ max: 50 })
        .withMessage("Position must be less than 50 characters"),

    body("year")
        .isInt({ min: 2003, max: new Date().getFullYear() + 1 })
        .withMessage("Year must be valid"),

    respondWithValidationErrors,
];

module.exports = {
    registerUser,
    loginUser,
    projectValidator,
    honorValidator,
};
