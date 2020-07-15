const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')



const coordinateSchema = new mongoose.Schema({
    longitude: {
        type: Number,
        required: true,
        trim: true
    },
    latitude: {
        type: Number,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    }
})



const driverSchema = new mongoose.Schema({
    role: {
        type: String,
        trim: true,
        required: true,
        default: "driver"
    },
    userName: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    userID: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    profilePictureUrl: {
        type: String
    },
    instituteName: {
        type: String,
        trim: true,
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
    carNumber: {
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
    location: [coordinateSchema],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});





module.exports = {
    Driver: mongoose.model('Driver', driverSchema)
}