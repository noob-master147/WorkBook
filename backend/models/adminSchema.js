const mongoose = require('mongoose')


const adminSchema = new mongoose.Schema({
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
    organizationName: {
        type: String,
        required: true
    },
    organizationType: {
        type: String,
        required: true
    },
    organizationImage: {
        type: String,
        required: true
    },
    numberOfMembers: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    mailAddress: {
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
    User: mongoose.model('Admin', adminSchema)
}