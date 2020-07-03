const { Query } = require('../models/querySchema')


const registerQuery = async(req, res, next) => {
    try {
        await Query.findOneAndUpdate({
                userID: req.body.userID
            }, {
                status: 'registered'
            })
            .then(() => {
                next()
            })
            .catch((err) => {
                throw new Error("Could Not Connect to DataBase")
            })

    } catch (error) {

        res.send({
            statusCode: 400,
            payload: {
                msg: "Could not Hash The Password, Contact Support",
                error: error

            },
        }).status(400)
    }


}




module.exports = {
    registerQuery
}