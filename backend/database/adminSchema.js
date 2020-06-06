const mongoose = require('mongoose')


const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        required: true,
        default: flase
    }
});


module.exports = {
    User: mongoose.model('User', userSchema)
}