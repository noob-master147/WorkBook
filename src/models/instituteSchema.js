const mongoose = require('mongoose')


const divisionSchema = new mongoose.Schema({
    division: {
        type: String,
        required: true,
        trim: true
    }
})


const gradeSchema = new mongoose.Schema({
    grade: {
        type: String,
        required: true,
        trim: true
    }
})




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
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    grade: [gradeSchema],
    division: [divisionSchema]
});




module.exports = {
    Institute: mongoose.model('Institute', instituteSchema)
}