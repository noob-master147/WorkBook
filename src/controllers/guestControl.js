const chalk = require('chalk')
const { ObjectID } = require('mongodb')
const { Query } = require('../models/querySchema')



const createQuery = (obj) => {
    return new Promise(async(resolve, reject) => {
        const id = new ObjectID()
        query = new Query({
            _id: id,
            userID: obj.userID,
            userName: obj.userName,
            message: obj.message,
            instituteName: obj.instituteName,
            fcmToken: obj.fcmToken
        })
        await query.save()
            .then(() => {
                console.log(chalk.green.bold("New Query Created"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "New Query Created",
                        _id: id
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Creating New Query!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Creating New Query! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}


const getAllQuery = () => {
    return new Promise(async(resolve, reject) => {
        await Query.find()
            .then((query) => {
                console.log(chalk.green.bold("Query Fetched"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Query Fetched",
                        query: query
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Fetching Query!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Fetching Query! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}


module.exports = {
    createQuery,
    getAllQuery
}