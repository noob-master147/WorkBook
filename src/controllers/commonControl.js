const chalk = require('chalk')
const bcrypt = require('bcrypt')

const { sendMail } = require('../middleware/sendMail')
const admin = require("firebase-admin")

const { SuperAdmin } = require('../models/superAdminSchema')
const { Admin } = require('../models/adminSchema')
const { Employee } = require('../models/employeeSchema')
const { Customer } = require('../models/customerSchema')
const { Institute } = require('../models/instituteSchema')
const { Driver } = require('../models/driverSchema')
const { Guest } = require('../models/guestSchema')
const { Role } = require('../models/RoleSchema')
const { Post } = require('../models/postSchema')
const { Route } = require('../models/routeSchema')
const { Query } = require('../models/querySchema')




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

const sendTopicNotification = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.bold.yellow("Sending Topic Notification..."))
        const payload = {
            notification: {
                title: obj.title,
                body: obj.message
            }
        }
        await admin.messaging().sendToTopic(obj.topic, payload)
            .then((response) => {
                console.log(chalk.bold.green("Topic Notification Sent!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Topic Notification Sent",
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
                statusCode: 400,
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
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Institute Image Fetched",
                        instituteImageUrl: institute.instituteImageUrl
                    }
                })
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
        console.log(chalk.bold.yellow("Fetching Divisions..."))
        Institute.findOne({
                instituteName: obj.instituteName
            })
            .then((institute) => {
                const divisions = institute.division
                console.log(chalk.bold.green("Institute Fetched!"))
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

const restoreDataBase = (obj) => {
    return new Promise(async(resolve, reject) => {
        const superAdmin = await SuperAdmin.find()
        const admin = await Admin.find()
        const employee = await Employee.find()
        const customer = await Customer.find()
        const driver = await Driver.find()
        const guest = await Guest.find()
        const institute = await Institute.find()
        const role = await Role.find()
        const post = await Post.find()
        const query = await Query.find()

        const p1 = await Admin.remove({}, function(err) {
            console.log(chalk.red.bold('Admin collection removed'))
        })
        const p2 = await Employee.remove({}, function(err) {
            console.log(chalk.red.bold('Employee collection removed'))
        })
        const p3 = await Institute.remove({}, function(err) {
            console.log(chalk.red.bold('Institute collection removed'))
        })
        const p4 = await Customer.remove({}, function(err) {
            console.log(chalk.red.bold('Customer collection removed'))
        })
        const p5 = await Driver.remove({}, function(err) {
            console.log(chalk.red.bold('Driver collection removed'))
        })
        const p6 = await Role.remove({}, function(err) {
            console.log(chalk.red.bold('Role collection removed'))
        })
        const p7 = await SuperAdmin.remove({}, function(err) {
            console.log(chalk.red.bold('SuperAdmin collection removed'))
        })
        const p8 = await Post.remove({}, function(err) {
            console.log(chalk.red.bold('Post collection removed'))
        })
        const p9 = await Query.remove({}, function(err) {
            console.log(chalk.red.bold('Querry collection removed'))
        })
        const p10 = await Guest.remove({}, function(err) {
            console.log(chalk.red.bold('Guest collection removed'))
        })
        Promise.all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10])
            .then(async() => {
                const p1 = await SuperAdmin.insertMany(superAdmin)
                const p2 = await Admin.insertMany(admin)
                const p3 = await Employee.insertMany(employee)
                const p4 = await Customer.insertMany(customer)
                const p5 = await Driver.insertMany(driver)
                const p6 = await Guest.insertMany(guest)
                const p7 = await Institute.insertMany(institute)
                const p8 = await Role.insertMany(role)
                const p9 = await Post.insertMany(post)
                const p10 = await Query.insertMany(query)
                Promise.all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10])
                    .then(() => {
                        console.log(chalk.bold.green("DataBase Recovered!"))
                        resolve({
                            statusCode: 200,
                        })
                    })
                    .catch((err) => {
                        console.log(chalk.red.bold("Error in Fetching Grades !"))
                        reject({
                            statusCode: 400,
                            payload: {
                                msg: "Error in Pushing to DataBase! Contact Support",
                                Error: "Issue in connecting to the Datebase",
                                err: err
                            }
                        })
                    })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Fetching Grades !"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Pushing to DataBase! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
        console.log(post)

    })
}


const getRoutes = (obj) => {
    return new Promise(async(resolve, reject) => {
        Route.find()
            .then((routes) => {
                console.log(chalk.bold.green("Routes Fetched!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Routes Fetched",
                        routes: routes
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Fetching Routes!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Fetching Routes ! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}


const forgot = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Forgot Password, Sending new Details"))
        await generateToken()
            .then(async(token) => {
                console.log("token  ", token)
                const p1 = await sendMail({
                    mail: obj.email,
                    token: token
                })
                const p2 = await Role.findOneAndUpdate({
                    userID: obj.email
                }, {
                    passwordResetToken: {
                        token: token,
                        tokenExpire: Date.now() + 300000
                    }
                })
                Promise.all([p1, p2])
                    .then(() => {
                        resolve({
                            statusCode: 200,
                            payload: {
                                msg: "Reset Password Mail Sent"
                            }
                        })
                    }).catch((err) => {
                        reject({
                            statusCode: 400,
                            payload: {
                                msg: "Error in Resetting Password! Contact Support",
                                err: err
                            }
                        })
                    })
            })
            .catch((err) => {
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Resetting Password! Contact Support",
                        err: err
                    }
                })
            })

    })
}


const sendVerification = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Verify User, Sending Verification Email Details"))
        const role = obj.role
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
        const checkUser = await alias.findOne({
            userID: obj.userID
        })
        if (checkUser) {
            console.log(chalk.red.bold("Verification Email not Sent, User already exist"))
            reject({
                statusCode: 401,
                payload: {
                    msg: "User Already Exist!"
                }
            })
        } else {
            await generateToken()
                .then(async(token) => {
                    console.log("token  ", token)
                    await sendMail({
                            mail: obj.userID,
                            token: token
                        })
                        .then(() => {
                            resolve({
                                statusCode: 200,
                                payload: {
                                    msg: "Verification Email Sent",
                                    token: token
                                }
                            })
                        }).catch((err) => {
                            reject({
                                statusCode: 400,
                                payload: {
                                    msg: "Error in Sending Verification Email! Contact Support",
                                    err: err
                                }
                            })
                        })
                })
                .catch((err) => {
                    reject({
                        statusCode: 400,
                        payload: {
                            msg: "Error in Sending Verification Email! Contact Support",
                            err: err
                        }
                    })
                })
        }


    })
}


const generateToken = () => {
    return new Promise(async(resolve, reject) => {
        const token = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        resolve(token)
    })
}


const resetPassword = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Resetting Password..."))
        const role = obj.role
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
        await alias.findOneAndUpdate({
                userID: obj.userID
            }, {
                password: obj.password
            }, {
                next: true
            })
            .then((user) => {
                if (!user)
                    throw new Error("No User Exist")
                console.log(chalk.bold.green("Password Changed!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Password changed"
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Updating the Password!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Updating the Password! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}


const verifyOTP = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Verifing OTP..."))
        userRole = await Role.findOne({ userID: obj.userID })
        if (userRole.passwordResetToken.tokenExpire < Date.now()) {
            console.log(chalk.red.bold("OTP Expired!"))
            reject({
                statusCode: 400,
                payload: {
                    msg: "OTP Expirred"
                }
            })
        } else if (obj.token != userRole.passwordResetToken.token) {
            console.log(chalk.red.bold("Wrong OTP!"))
            reject({
                statusCode: 400,
                payload: {
                    msg: "Wrong OTP!"
                }
            })
        } else {
            await Role.findOneAndUpdate({
                    userID: obj.userID
                }, {
                    tokenVerify: {
                        verifyOTP: true
                    }
                })
                .then(() => {
                    console.log(chalk.bold.green("OTP Verified!"))
                    resolve({
                        statusCode: 200,
                        payload: {
                            msg: "OTP Verified"
                        }
                    })
                })
                .catch((err) => {
                    console.log(chalk.red.bold("Error in OTP Verification!"))
                    reject({
                        statusCode: 400,
                        payload: {
                            msg: "Error in OTP Verification! Contact Support",
                            Error: "Issue in connecting to the Datebase",
                            err: err
                        }
                    })
                })
        }
    })
}


const verifyUser = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Verifing User OTP..."))
        userRole = await Role.findOne({ userID: obj.userID })
        if (userRole.passwordResetToken.tokenExpire < Date.now()) {
            console.log(chalk.red.bold("OTP Expired!"))
            reject({
                statusCode: 400,
                payload: {
                    msg: "OTP Expirred"
                }
            })
        } else if (obj.token != userRole.passwordResetToken.token) {
            console.log(chalk.red.bold("Wrong OTP!"))
            reject({
                statusCode: 400,
                payload: {
                    msg: "Wrong OTP!"
                }
            })
        } else {
            await Role.findOneAndUpdate({
                    userID: obj.userID
                }, {
                    userVerified: true
                }, {
                    new: true
                })
                .then((role) => {
                    console.log(chalk.bold.green("User Verified!"))
                    resolve({
                        statusCode: 200,
                        payload: {
                            msg: "User Verified",
                            user: role
                        }
                    })
                })
                .catch((err) => {
                    console.log(chalk.red.bold("Error in User Verification!"))
                    reject({
                        statusCode: 400,
                        payload: {
                            msg: "Error in User Verification! Contact Support",
                            Error: "Issue in connecting to the Datebase",
                            err: err
                        }
                    })
                })
        }

    })
}

const getHolidays = (obj) => {
    return new Promise(async(resolve, reject) => {
        Institute.findOne({
                instituteName: obj.instituteName
            })
            .then((institute) => {
                console.log(chalk.bold.green("Holidays Fetched!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Holidays Fetched",
                        holidays: institute.holidays
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Fetching Holidays!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Fetching Holidays! Contact Support",
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
    uploadPicture,
    getUserProfile,
    getInstituteProfile,
    fetchGrade,
    fetchDivision,
    getRoles,
    restoreDataBase,
    getRoutes,
    forgot,
    resetPassword,
    verifyOTP,
    verifyUser,
    sendVerification,
    sendTopicNotification,
    getHolidays
}