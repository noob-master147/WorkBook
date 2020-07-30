const { Query } = require('../models/querySchema')
const chalk = require('chalk')

const registerQuery = async(req, res, next) => {
    console.log(chalk.bold.cyanBright("Checking Previous Query..."))
    try {
        await Query.findOneAndUpdate({
                userID: req.body.userID
            }, {
                status: 'registered'
            })
            .then(() => {
                console.log(chalk.bold.green("Previous Query Found"))
                next()
            })
            .catch((err) => {
                throw new Error("Could Not Connect to DataBase")
            })

    } catch (error) {

        res.send({
            statusCode: 400,
            payload: {
                msg: "Could not Register, Contact Support",
                error: error

            },
        }).status(400)
    }
}




module.exports = {
    registerQuery
}