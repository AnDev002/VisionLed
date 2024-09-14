const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        emailId: { type: String, required: false },
        facebookId: { type: String, required: false },
        email: { type: String, required: false },
        password: { type: String, required: false },
        isAdmin: { type: Boolean, default: false },
        typeLogin: { type: String, default: "" },
        facebook: { type: String, required: false },
        avatar: { type: String, required: false },
        phone: { type: String, required: false },
        address: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;