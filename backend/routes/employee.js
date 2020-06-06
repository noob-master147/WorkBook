const router = require("express")();

//route to create for a user
router.get('/', (req, res) => {
    res.send({
        statusCode: 200,
        payload: {
            msg: "The employee routes is healthy and running"
        },
    }).status(200)
})

module.exports = router;