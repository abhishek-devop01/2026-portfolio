const mongoose = require("mongoose");

const proejctSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
    },
    year: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
    },
});

const projectModel = mongoose.model("project", proejctSchema);

module.exports = projectModel;
