const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
    user: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    uploadDate: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});

const resumeModel = mongoose.model("resume", resumeSchema);

module.exports = resumeModel;
