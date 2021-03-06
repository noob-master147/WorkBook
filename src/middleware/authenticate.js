const jwt = require('jsonwebtoken')
const chalk = require('chalk')

const authenticate = ((req, res, next) => {
    console.log(chalk.bold.cyanBright("Authenticating JWT Token..."))
    try {
        let data
        if (req.headers.jwttoken) {
            data = jwt.verify(req.headers.jwttoken, process.env.JWT_SECRET)
        } else if (req.body.jwtToken) {
            data = jwt.verify(req.body.jwtToken, process.env.JWT_SECRET)
        } else {
            throw new Error("JWT Authentication failed")
        }

        // check the token
        if (data.userID == req.body.userID) {
            console.log(chalk.bold.green("JWT Authenticated"))
            next()
        } else {
            throw new Error("JWT Authentication failed")
        }

    } catch (error) {
        console.log(chalk.bold.red("JWT Authentication Failed"))
        res.send({
            statusCode: 403,
            payload: {
                msg: "Could not Authenticate JWT Token, Contact Support",
                error: error
            },
        }).status(403)
    }

})



module.exports = {
    authenticate
}