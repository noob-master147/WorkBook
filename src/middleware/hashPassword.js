const bcrypt = require('bcrypt')
const chalk = require('chalk')

const hashPassword = async(req, res, next) => {
    console.log(chalk.bold.yellow("\nHashing the Password"))
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 8)
        req.body.password = hashedPassword
        console.log(chalk.bold.green("Password Hashed"))
        next()
    } catch {
        res.send({
            statusCode: 400,
            payload: {
                msg: "Could not Hash The Password, Contact Support"

            },
        }).status(400)
    }

}

module.exports = {
    hashPassword
}