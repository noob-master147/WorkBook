const chalk = require('chalk')
const brypt = require('bcrypt')

const { Driver } = require('../models/driverSchema')
const { Role } = require('../models/RoleSchema')
const { Route } = require('../models/routeSchema')
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
            instituteName: user.instituteName,
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
                await Driver.findByIdAndDelete(id)
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
                city: user.city,
                state: user.state,
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

const updateLocation = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Updating Driver Location..."))
        Driver.findByIdAndUpdate(obj.id, {
                location: obj.location
            }, {
                new: true
            })
            .then((driver) => {
                console.log(chalk.bold.green("Driver Location Updated!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Driver Location Updated",
                        driver: driver
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Updating Driver Location!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Updating Driver Location! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}

const getLocation = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Fetching Location..."))
        console.log("\nobj", obj)
        await Route.findOne({
                routeName: obj.routeName
            })
            .then((route) => {
                console.log("\nroute", route)
                return (route.driverID)
            })
            .then(async(id) => {
                console.log("\nid", id)
                const driver = await Driver.findById(id)
                return driver.location[0]
            })
            .then((location) => {
                console.log("\nLocation", location)
                console.log(chalk.bold.green("Location Fetched!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Location Fetched",
                        location: location
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Fetching Location!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Fetching Location! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}



module.exports = {
    register,
    login,
    updateDriver,
    updateLocation,
    getLocation
}