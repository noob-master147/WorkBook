const { Query } = require('../models/querySchema')


const registerQuery = async(obj) => {
    try {
        await Query.findOneAndUpdate({
                userID: obj.userID
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