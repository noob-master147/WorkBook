const chalk = require('chalk')
const { Customer } = require('../models/customerSchema')
const brypt = require('bcrypt')
const { ObjectID } = require('mongodb')



const register = (user) => {
    return new Promise(async(resolve, reject) => {
        customer = new Customer({
            role: user.role,
            userName: user.userName,
            userID: user.userID,
            password: user.password,
            grade: user.grade,
            division: user.division,
            instituteName: user.instituteName,
            numberOfMembers: user.numberOfMembers,
            state: user.state,
            mailAddress: user.mailAddress,
            adharNumber: user.adharNumber,
            contactNumber: user.contactNumber,
            fcmToken: user.fcmToken,
            approved: false
        })
        await customer.save()
            .then(() => {
                console.log(chalk.green.bold("New Customer Registered!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Customer Successfully Registered",
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Customer Registration!"))
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





module.exports = {
    register,
    login
}