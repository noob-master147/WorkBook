const jwt = require('jsonwebtoken')
const chalk = require('chalk')

const signJWT = ((req, res, next) => {
    console.log(chalk.bold.cyanBright("New JWT Sign..."))
    try {
        const token = jwt.sign({ userID: req.body.userID }, process.env.JWT_SECRET)
        req.body.jwtToken = token
        next()
    } catch (error) {
        res.send({
            statusCode: 400,
            payload: {
                msg: "Could not Sign JWT Token, Contact Support",
                error: error
            },
        }).status(400)
    }

})

module.exports = {
    signJWT
}