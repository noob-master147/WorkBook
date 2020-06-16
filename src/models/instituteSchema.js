const mongoose = require('mongoose')


const instituteSchema = new mongoose.Schema({
    instituteName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    instituteType: {
        type: String,
        required: true,
        trim: true
    },
    instituteImage: {
        type: Buffer,
        required: true
    }
});




module.exports = {
    Institute: mongoose.model('Institute', instituteSchema)
}