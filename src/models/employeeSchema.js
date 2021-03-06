const mongoose = require('mongoose')


const route = new mongoose.Schema({
    area: {
        type: String,
        trim: true
    },
    routeName: {
        type: String,
        trim: true
    },
    boardingPoint: {
        longitude: {
            type: Number,
            trim: true
        },
        latitude: {
            type: Number,
            trim: true
        },
        locationName: {
            type: String,
            trim: true
        }

    },
    droppingPoint: {
        longitude: {
            type: Number,
            trim: true
        },
        latitude: {
            type: Number,
            trim: true
        },
        locationName: {
            type: String,
            trim: true
        }
    },
    pickUpTime: {
        type: String,
        trim: true
    },
    cost: {
        type: Number,
        trim: true
    }
})



const employeeSchema = new mongoose.Schema({
    role: {
        type: String,
        trim: true,
        required: true,
        default: "employee"
    },
    userName: {
        type: String,
        trim: true,
        required: true,
    },
    userID: {
        type: String,
        trim: true,
        required: true,
        unique: true
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
        required: true,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    grade: {
        type: String,
        trim: true,
        required: true
    },
    division: {
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
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    route: [route],
    joiningDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    dob: {
        type: Date,
        required: true,
        default: Date.now
    },
    gender: {
        type: String,
        trim: true,
        default: "male"
    },
    bloodGroup: {
        type: String,
        trim: true,
        default: "A+"
    },
    nationality: {
        type: String,
        trim: true,
        default: "indian"
    },
    motherTounge: {
        type: String,
        trim: true,
        default: "english"
    }
});




module.exports = {
    Employee: mongoose.model('Employee', employeeSchema)
}