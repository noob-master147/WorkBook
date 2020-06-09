const chalk = require('chalk')
const { Admin } = require('../models/adminSchema')

const register = (user) => {
    return new Promise(async(resolve, reject) => {
        admin = new Admin({
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
                        msg: "Error in Adding Admin",
                        err: err
                    }
                })
            })
    })
}

module.exports = {
    register
}