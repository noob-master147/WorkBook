const mongoose = require('mongoose')


const employeeSchema = new mongoose.Schema({
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
    grade: {
        type: String,
        required: true
    },
    division: {
        type: String,
        required: true
    },
    associateName: {
        type: String,
        required: true
    },
    numberOfMembers: {
        type: Number,
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
    User: mongoose.model('Employee', employeeSchema)
}