const chalk = require('chalk')
const { Employee } = require('../database/employeeSchema')


const create = (user) => {
    return new Promise((resolve, reject) => {
        console.log("Adding New User")
        console.log(user)
        resolve()
    })
}

module.exports = {
    create
}