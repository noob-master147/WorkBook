const chalk = require('chalk')
const serviceAccount = require("../../firebase-key.json")
const bcrypt = require('bcrypt')
const { Admin } = require('../models/adminSchema')
const { Employee } = require('../models/employeeSchema')
const { Customer } = require('../models/customerSchema')
const { Institute } = require('../models/instituteSchema')
const { Driver } = require('../models/driverSchema')
const { Role } = require('../models/RoleSchema')

const admin = require("firebase-admin")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
})

const sendNotification = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.bold.yellow("Sending Notification..."))
        const fcmToken = obj.fcmToken;
        const payload = {
            notification: {
                title: obj.title,
                body: obj.message
            }
        }

        await admin.messaging().sendToDevice(fcmToken, payload)
            .then((response) => {
                console.log(chalk.bold.green("Notification Sent!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Notification Sent",
                        response: response
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Notification Not Sent!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Sending Notification! Contact Support",
                        Error: "Issue in connecting to the Firebase",
                        err: err
                    }
                })
            })
    })
}



const login = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold(`${obj.user.role} Logging in...`))
        if (await bcrypt.compare(obj.password, obj.user.password) === true) {
            console.log(chalk.green.bold(`${obj.user.role} Authenticated`))
            if (obj.user.approved === true) {
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: `${obj.user.role} Logged In and Approved`,
                        approved: obj.user.approved,
                        user: obj.user
                    }
                })
            } else {
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: `${obj.user.role} Logged In and Not Approved`,
                        approved: obj.user.approved,
                        user: obj.user
                    }
                })
            }
        } else {
            reject({
                statusCode: 401,
                payload: {
                    msg: "Password Incorrect",
                }
            })
        }
    })
}


const uploadPicture = (user) => {
    return new Promise(async(resolve, reject) => {
        user.body.profilePicture = user.file.buffer
        console.log(chalk.bold.yellow("Updating Profile Picture..."))
        const role = user.body.user.role
        let alias = null
        switch (role) {
            case "admin":
                alias = Admin
                break;
            case "employee":
                alias = Employee
                break;
            case "customer":
                alias = Customer
                break;
            case "driver":
                alias = Driver
                break;
            case "guest":
                alias = Guest
                break;
        }

        await alias.findByIdAndUpdate(user.body.user._id, {
            'profilePicture': user.body.profilePicture
        })

        .then(() => {
                console.log(chalk.bold.green("Profile Picture Added!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Profile Picture Added"
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Adding Profile Picture!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Adding Profile Picture! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })

    })
}

module.exports = {
    sendNotification,
    login,
    uploadPicture
}