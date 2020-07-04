const chalk = require('chalk')
const serviceAccount = require("../../firebase-key.json")
const bcrypt = require('bcrypt')
const sharp = require('sharp')
const { SuperAdmin } = require('../models/superAdminSchema')
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
                        user: obj.user,
                        jwtToken: obj.jwtToken
                    }
                })
            } else {
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: `${obj.user.role} Logged In and Not Approved`,
                        approved: obj.user.approved,
                        user: obj.user,
                        jwtToken: obj.jwtToken
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
        console.log(chalk.bold.yellow("Updating Profile Picture..."))
        const role = user.user.role
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

        await alias.findByIdAndUpdate(user.user._id, {
            'profilePictureUrl': user.profilePictureUrl
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


const getUserProfile = (params) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.bold.yellow("Fetching Profile Picture..."))
        const role = params.role
        let alias = null
        switch (role) {
            case "superAdmin":
                alias = SuperAdmin
                break;
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

        alias.findById(params.id)
            .then((user) => {
                if (user.profilePictureUrl) {
                    console.log(chalk.bold.green("Profile Picture Fetched!"))
                    resolve(user.profilePictureUrl)
                } else {
                    console.log(chalk.bold.red("Profile Picture Doesn't Exist!"))
                    reject({
                        statusCode: 400,
                        payload: {
                            msg: "Profile Picture Doesn't Exist!",
                            err: err
                        }
                    })
                }

            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Fetching Profile Picture!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Fetching Profile Picture! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}

// Institute Picture
const getInstituteProfile = (params) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.bold.yellow("Fetching Institute Picture..."))
        Institute.findOne({
                'instituteName': params.instituteName
            })
            .then((institute) => {
                console.log(chalk.bold.green("Institute Picture Fetched!"))
                resolve(institute.instituteImageUrl)
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Fetching Institute Picture Url!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Fetching Institute Picture Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}


const fetchGrade = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.bold.yellow("Fetching Grades..."))
        Institute.findOne({
                instituteName: obj.instituteName
            })
            .then((institute) => {
                let grades = []
                console.log(chalk.bold.green("Grades Fetched!"))
                institute.grade.forEach(obj => {
                    grades.push(obj.grade)
                });
                console.log(grades)
                return grades
            })
            .then((grades) => {
                console.log(chalk.bold.green("Grades Fetched!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Grades Fetched",
                        grades: grades
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Fetching Grades !"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Fetching Grades! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })

    })
}



const fetchDivision = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.bold.yellow("Fetching Grades..."))
        Institute.findOne({
                instituteName: obj.instituteName
            })
            .then((institute) => {
                let divisions = []
                console.log(chalk.bold.green("Institute Fetched!"))
                institute.division.forEach(obj => {
                    divisions.push(obj.division)
                });
                console.log(divisions)
                return divisions
            })
            .then((divisions) => {
                console.log(chalk.bold.green("Divisions Fetched!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Divisions Fetched",
                        divisions: divisions
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Fetching Divisions !"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Fetching Divisions! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}


const getRoles = () => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Getting all Roles..."))
        await Role.find()
            .then((roles) => {
                console.log(chalk.green.bold("Roles Fetched!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Roles Fetched",
                        roles: roles
                    }
                })
            })
            .catch(async(err) => {
                console.log(chalk.red.bold("Error in Fetching Roles!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Unable to Reach DataBase! Contact Support",
                        err: err
                    }
                })
            })

    })
}


module.exports = {
    sendNotification,
    login,
    uploadPicture,
    getUserProfile,
    getInstituteProfile,
    fetchGrade,
    fetchDivision,
    getRoles
}