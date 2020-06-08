const chalk = require('chalk')
const { Employee } = require('../database/employeeSchema')



const createEmployee = (user) => {
    return new Promise(async(resolve, reject) => {
        employee = new Employee({
            role: user.role,
            userName: user.userName,
            userID: user.userID,
            password: user.password,
            grade: user.grade,
            division: user.division,
            adharNumber: user.adharNumber,
            contactNumber: user.contactNumber,
            approved: false
        })
        await employee.save()
            .then(() => {
                console.log("New Employee Added!")
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Employee Successfully Added",
                    }
                })
            })
            .catch((err) => {
                console.log("Error in Employee Admin!")
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Employee Admin",
                        err: err
                    }
                })
            })
    })
}

module.exports = {
    createEmployee
}