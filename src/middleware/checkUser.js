const checkUser = async(req, res, next) => {
    console.log(chalk.bold.cyanBright("\Checking if User Exist..."))

    try {
        const user = await Role.findOne({
            userID: obj.email
        })
        if (!user) {
            console.log(chalk.red.bold("User Does Not Exist"))
            throw new error("User Does Not Exist")
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