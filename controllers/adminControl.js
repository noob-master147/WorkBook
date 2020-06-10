const chalk = require('chalk')
const { Admin } = require('../models/adminSchema')
const brypt = require('bcrypt')
const { ObjectID } = require('mongodb')

const register = (user) => {
    return new Promise(async(resolve, reject) => {
        const id = new ObjectID()
        admin = new Admin({
            _id: id,
            role: user.role,
            userName: user.userName,
            userID: user.userID,
            password: user.password,
            organizationName: user.organizationName,
            organizationType: user.organizationType,
            organizationImage: user.organizationImage,
            numberOfMembers: user.numberOfMembers,
            state: user.state,
            district: user.district,
            city: user.city,
            mailAddress: user.mailAddress,
            adharNumber: user.adharNumber,
            contactNumber: user.contactNumber,
            approved: false
        })
        await admin.save()
            .then(() => {
                console.log("New Admin Added!")
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Admin Successfully Added",
                    }
                })
            })
            .catch((err) => {
                console.log("Error in Adding Admin!")
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Adding Admin. Contact Support",
                        err: err
                    }
                })
            })
    })
}



const login = (user) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Logging in..."))
        const formPassword = user.password
        Admin.findOne({
                'userID': user.email
            })
            .then((admin) => {
                if (brypt.compare(formPassword, admin.password)) {
                    console.log(chalk.green.bold('Admin Authenticated'))
                    if (admin.approved) {
                        resolve({
                            statusCode: 200,
                            payload: {
                                msg: "Admin Logged In and Approved",
                                approved: admin.approved,
                                admin: admin
                            }
                        })
                    } else {
                        resolve({
                            statusCode: 200,
                            payload: {
                                msg: "Admin Logged In and Not Approved",
                                approved: admin.approved,
                                admin: admin
                            }
                        })
                    }
                } else {
                    resolve({
                        statusCode: 200,
                        payload: {
                            msg: "Password Incorrect",
                        }
                    })
                }
            })
            .catch((err) => {
                console.log("Error in Logging In Admin!")
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Logging In Admin! Contact Support",
                        err: err
                    }
                })
            })
    })
}


module.exports = {
    register,
    login
}