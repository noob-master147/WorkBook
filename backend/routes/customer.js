const router = require("express")();


router.get('/', (req, res) => {
    res.send({
        statusCode: 200,
        payload: {
            msg: "The customer routes is healthy and running"
        },
    }).status(200)
})

module.exports = router;