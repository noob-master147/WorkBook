const router = require("express")();
const customerControl = require('../controllers/customerControl')

router.get('/', (req, res) => {
    res.send({
        statusCode: 200,
        payload: {
            msg: "The customer routes is healthy and running"
        },
    }).status(200)
})


router.post('/create', (req, res) => {
    customerControl.create(req.body)
        .then((obj) => res.send(obj).status(201))
        .catch((err) => res.send(err).status(400))
})

module.exports = router;