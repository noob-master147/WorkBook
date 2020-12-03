const mongoose = require('mongoose')


const divisionSchema = new mongoose.Schema({
    division: {
        type: String,
        required: true,
        trim: true
    },
    grade: {
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


const scheduleSchema = new mongoose.Schema({
    grade_division: {
        type: String,
        trim: true,
        unique: true
    },
    scheduleUrl: {
        type: String,
        trim: true,
        unique: true
    }
})

const holidaySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true
    },
    date: {
        type: String,
        trim: true,
        unique: true
    },
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
    instituteImageUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    grade: [gradeSchema],
    division: [divisionSchema],
    schedule: [scheduleSchema],
    holidays: [holidaySchema]
});




module.exports = {
    Institute: mongoose.model('Institute', instituteSchema)
}

// obj = {
    // data: [
    //     {
    //         grade: "qwert",
    //         division: "1"
    //     },
    //     {
    //         grade: "qwert",
    //         division: "2"
    //     },
    //     {
    //         grade: "asd",
    //         division: "1"
    //     },
    //     {
    //         grade: "asd",
    //         division: "2"
    //     },

    // ]
// }