const mongoose = require('mongoose')


const driverSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    carNumber: {
        type: String,
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
    approved: {
        type: Boolean,
        required: true,
        default: false
    },
});





module.exports = {
    User: mongoose.model('Driver', driverSchema)
}