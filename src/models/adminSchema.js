const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        default: "admin"
    },
    profilePictureUrl: {
        type: String
    },
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    userID: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    instituteName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    instituteType: {
        type: String,
        required: true,
        trim: true
    },
    instituteImageUrl: {
        type: String,
        required: true
    },
    numberOfMembers: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    mailAddress: {
        type: String,
        trim: true,
        required: true
    },
    adharNumber: {
        type: Number,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    fcmToken: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    reference: {
        type: String,
        default: "self"
    }
});


module.exports = {
    Admin: mongoose.model('Admin', adminSchema)
}