const chalk = require('chalk')
const { Role } = require('../models/RoleSchema')

const checkDuplicate = async(req, res, next) => {
    console.log(chalk.bold.cyanBright("\Checking if User is Registered Before..."))
    const userID = req.params.email || req.body.userID
    try {
        const user = await Role.findOne({
            userID: userID
        })
        if (user) {
            console.log(chalk.red.bold("User Registered Before"))
            res.send({
                statusCode: 400,
                payload: {
                    error: "User Registered Before"
                }
            })
        } else {
            console.log(chalk.bold.green("User Not Registered Before"))
            next()
        }

    } catch (error) {
        res.send({
            statusCode: 400,
            payload: {
                error: error
            }
        })
    }
}



module.exports = {
    checkDuplicate
}