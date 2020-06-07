const mongoose = require('mongoose')


const adminSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userID: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    organizationName: {
        type: Boolean,
        required: true,
        default: flase
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
        type: String,
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
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
});




module.exports = {
    User: mongoose.model('Admin', adminSchema)
}