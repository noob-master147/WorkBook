const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const adminSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        default: "admin"
    },
    profilePicture: {
        type: Buffer
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
    instituteImage: {
        type: Buffer,
        required: true
    },
    numberOfMembers: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
        required: true
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
    }
});









module.exports = {
    Admin: mongoose.model('Admin', adminSchema)
}