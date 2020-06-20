const chalk = require('chalk')
const brypt = require('bcrypt')

const { Customer } = require('../models/customerSchema')
const { Role } = require('../models/RoleSchema')
const { ObjectID } = require('mongodb')


/** Register Customer
 * @api {post} /customer/register Customer Register
 * @apiName Register
 * @apiGroup Customer
 *
 * @apiParam {String} userName User Name
 * @apiParam {String} userID Email ID
 * @apiParam {String} password Password
 * @apiParam {String} instituteName Name of The Institute
 * @apiParam {String} grade Grade
 * @apiParam {String} division Division
 * @apiParam {Number} adharNumber Adhar Number
 * @apiParam {Number} contactNumber Contact Number
 * @apiParam {String} fcmToken FCM Device Token
 * 
 *
 */ // Register Customer
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
            numberOfMembers: user.numberOfMembers,
            state: user.state,
            mailAddress: user.mailAddress,
            adharNumber: user.adharNumber,
            contactNumber: user.contactNumber,
            fcmToken: user.fcmToken,
            approved: false
        })
        role = new Role({
            _id: id,
            userID: user.userID,
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
                        msg: "Customer Successfully Registered",
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

module.exports = {
    register,
    login
}