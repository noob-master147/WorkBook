const mongoose = require('mongoose')


const coordinateSchema = new mongoose.Schema({
    longitude: {
        type: Number,
        required: true,
        trim: true
    },
    latitude: {
        type: Number,
        required: true,
        trim: true
    },
    locationName: {
        type: String,
        required: true,
        trim: true
    }
})



const routeSchema = new mongoose.Schema({
    driverID: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    routeName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    location: [coordinateSchema]
});




module.exports = {
    Route: mongoose.model('Route', routeSchema)
}