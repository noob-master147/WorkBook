const chalk = require('chalk')
const { Role } = require('../models/RoleSchema')

const checkUser = async(req, res, next) => {
    console.log(chalk.bold.cyanBright("\Checking if User Exist..."))

    try {
        const user = await Role.findOne({
            userID: req.params.email
        })
        if (!user) {
            console.log(chalk.red.bold("User Does Not Exist"))
            res.send({
                statusCode: 400,
                payload: {
                    error: "User Does not Exist"
                }
            })
        } else {
            console.log(chalk.bold.green("User Exists"))
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
    checkUser
}