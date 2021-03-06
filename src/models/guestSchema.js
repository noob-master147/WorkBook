const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const guestSchema = new mongoose.Schema({
    role: {
        type: String,
        trim: true,
        required: true,
        default: "guest"
    },
    organization: {
        type: String,
        trim: true,
        required: true
    },
    adharNumber: {
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
    contactNumber: {
        type: Number,
        required: true
    },
    emailId: {
        type: String,
        trim: true,
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
    Guest: mongoose.model('Guest', guestSchema)
}