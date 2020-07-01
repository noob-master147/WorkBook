const chalk = require('chalk')
const { ObjectID } = require('mongodb')
const { Querry } = require('../models/querrySchema')



const createQuerry = (obj) => {
    return new Promise(async(resolve, reject) => {
        querry = new Querry({
            userID: obj.userID,
            userName: obj.userName,
            message: obj.message,
            fcmToken: obj.fcmToken
        })
        await querry.save()
            .then(() => {
                console.log(chalk.green.bold("New Querry Created"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "New Querry Created",
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Creating New Querry!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Creating New Querry! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}












module.exports = {
    createQuerry
}