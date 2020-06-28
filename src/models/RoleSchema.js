const mongoose = require('mongoose')


const roleSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        trim: true
    },
    userID: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});




module.exports = {
    Role: mongoose.model('Role', roleSchema)
}