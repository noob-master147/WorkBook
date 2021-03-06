const chalk = require('chalk')
const brypt = require('bcrypt')

const { Customer } = require('../models/customerSchema')
const { Role } = require('../models/RoleSchema')
const { ObjectID } = require('mongodb')


const register = (user) => {
    return new Promise(async(resolve, reject) => {
        const id = new ObjectID()
        customer = new Customer({
            _id: id,
            userName: user.userName,
            userID: user.userID,
            password: user.password,
            grade: user.grade,
            division: user.division,
            instituteName: user.instituteName,
            mailAddress: user.mailAddress,
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
            role: "customer"
        })
        Promise.all([
                customer.save(),
                role.save()
            ])
            .then(() => {
                console.log(chalk.green.bold("New Customer Registered!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Customer Successfully Registered"
                    }
                })
            })
            .catch(async(err) => {
                console.log(chalk.red.bold("Error in Customer Registration!"))
                await Customer.findByIdAndDelete(id)
                await Role.findByIdAndDelete(id)
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Adding Customer",
                        err: err
                    }
                })
            })
    })
}

const login = (user) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("\nCustomer Logging in..."))
        const formPassword = user.password
        Customer.findOneAndUpdate({
                'userID': user.email
            }, {
                'fcmToken': user.fcmToken
            }, {
                new: true
            })
            .then(async(customer) => {
                if (await brypt.compare(formPassword, customer.password) === true) {
                    console.log(chalk.green.bold('Customer Authenticated'))
                    if (customer.approved === true) {
                        console.log(chalk.green.bold('Customer Approved'))
                        resolve({
                            statusCode: 200,
                            payload: {
                                msg: "Customer Logged In and Approved",
                                approved: customer.approved,
                                customer: customer
                            }
                        })
                    } else {
                        console.log(chalk.green.bold('Customer Not Approved'))
                        resolve({
                            statusCode: 200,
                            payload: {
                                msg: "Customer Logged In and Not Approved",
                                approved: customer.approved,
                                customer: customer
                            }
                        })
                    }
                } else {
                    console.log(chalk.red.bold('Customer Not Authenticated'))
                    resolve({
                        statusCode: 200,
                        payload: {
                            msg: "Password Incorrect",
                        }
                    })
                }
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Logging In Customer!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Logging In Customer! Contact Support",
                        err: "Email not found"
                    }
                })
            })
    })
}

const updateCustomer = (customer) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Updating Customer..."))
        Customer.findByIdAndUpdate(customer.id, {
                userName: user.userName,
                grade: user.grade,
                division: user.division,
                state: user.state,
                city: user.city,
                mailAddress: user.mailAddress,
                adharNumber: user.adharNumber,
                contactNumber: user.contactNumber,
                fcmToken: user.fcmToken,
            }, {
                new: true
            })
            .then((customer) => {
                console.log(chalk.green.bold("New Customer Updated!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Customer Successfully Updated",
                        customer: customer
                    }
                })
            })
            .catch(async(err) => {
                console.log(chalk.red.bold("Error in Updating Customer!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Adding Customer",
                        err: err
                    }
                })
            })
    })
}

module.exports = {
    register,
    login,
    updateCustomer
}