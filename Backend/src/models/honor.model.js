const mongoose = require("mongoose");

const honorSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        certificate: {
            type: String,
        },
    },
    { timestamps: true }
);

const honorModel = mongoose.model("honor", honorSchema);

module.exports = honorModel;
