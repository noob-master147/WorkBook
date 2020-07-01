const chalk = require('chalk')
const brypt = require('bcrypt')

const { Driver } = require('../models/driverSchema')
const { Role } = require('../models/RoleSchema')
const { ObjectID } = require('mongodb')


const register = (user) => {
    return new Promise(async(resolve, reject) => {
        const id = new ObjectID()
        driver = new Driver({
            _id: id,
            userName: user.userName,
            userID: user.userID,
            password: user.password,
            carNumber: user.carNumber,
            instituteName: user.instituteName,
            adharNumber: user.adharNumber,
            contactNumber: user.contactNumber,
            fcmToken: user.fcmToken,
            approved: false
        })
        role = new Role({
            _id: id,
            fcmToken: user.fcmToken,
            userID: user.userID,
            role: "driver"
        })
        Promise.all([
                driver.save(),
                role.save()
            ])
            .then(() => {
                console.log(chalk.green.bold("New Driver Registered!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Driver Successfully Registered"
                    }
                })
            })
            .catch(async(err) => {
                console.log(chalk.red.bold("Error in Driver Registration!"))
                await driver.findByIdAndDelete(id)
                await Role.findByIdAndDelete(id)
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Adding Driver",
                        err: err
                    }
                })
            })
    })
}

const login = (user) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("\nDriver Logging in..."))
        const formPassword = user.password
        Driver.findOneAndUpdate({
                'userID': user.email
            }, {
                'fcmToken': user.fcmToken
            }, {
                new: true
            })
            .then(async(driver) => {
                if (await brypt.compare(formPassword, driver.password) === true) {
                    console.log(chalk.green.bold('Driver Authenticated'))
                    if (driver.approved === true) {
                        console.log(chalk.green.bold('Driver Approved'))
                        resolve({
                            statusCode: 200,
                            payload: {
                                msg: "Driver Logged In and Approved",
                                approved: driver.approved,
                                driver: driver
                            }
                        })
                    } else {
                        console.log(chalk.green.bold('Driver Not Approved'))
                        resolve({
                            statusCode: 200,
                            payload: {
                                msg: "Driver Logged In and Not Approved",
                                approved: driver.approved,
                                driver: driver
                            }
                        })
                    }
                } else {
                    console.log(chalk.red.bold('Driver Not Authenticated'))
                    resolve({
                        statusCode: 200,
                        payload: {
                            msg: "Password Incorrect",
                        }
                    })
                }
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Logging In Driver!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Logging In Driver! Contact Support",
                        err: "Email not found"
                    }
                })
            })
    })
}

const updateDriver = (driver) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Updating driver..."))
        driver.findByIdAndUpdate(driver.id, {
                userName: user.userName,
                carNumber: user.carNumber,
                adharNumber: user.adharNumber,
                contactNumber: user.contactNumber,
                fcmToken: user.fcmToken,
            }, {
                new: true
            })
            .then((driver) => {
                console.log(chalk.green.bold("New driver Updated!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "driver Successfully Updated",
                        driver: driver
                    }
                })
            })
            .catch(async(err) => {
                console.log(chalk.red.bold("Error in Updating driver!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Adding driver",
                        err: err
                    }
                })
            })
    })
}

module.exports = {
    register,
    login,
    updateDriver
}