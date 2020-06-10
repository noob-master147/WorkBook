const chalk = require('chalk')
const { Customer } = require('../models/customerSchema')


const register = (user) => {
    return new Promise(async(resolve, reject) => {
        customer = new Customer({
            role: user.role,
            userName: user.userName,
            userID: user.userID,
            password: user.password,
            grade: user.grade,
            division: user.division,
            associateName: user.associateName,
            numberOfMembers: user.numberOfMembers,
            state: user.state,
            mailAddress: user.mailAddress,
            adharNumber: user.adharNumber,
            contactNumber: user.contactNumber,
            approved: false
        })
        await customer.save()
            .then(() => {
                console.log("New Customer Added!")
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Customer Successfully Added",
                    }
                })
            })
            .catch((err) => {
                console.log("Error in Adding Customer!")
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
    register
}