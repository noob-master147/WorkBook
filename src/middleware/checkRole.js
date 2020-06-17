const chalk = require('chalk')

const checkRole = async(req, res, next) => {
    console.log(chalk.bold.yellow("\nChecking User Role..."))
    try {

        next()
    } catch {
        res.send({
            statusCode: 500,
            payload: {
                msg: "Contact Support"

            },
        }).status(200)
    }

}

module.exports = {
    checkRole
}