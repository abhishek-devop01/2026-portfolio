const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    content: [
        {
            section: {
                type: String,
                required: true,
            },
        },
    ],
});

const skillModel = mongoose.model("skill", skillSchema);

module.exports = skillModel;
