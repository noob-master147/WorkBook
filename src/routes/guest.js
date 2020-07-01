const chalk = require('chalk')
const router = require("express")();
const guestControl = require('../controllers/guestControl')
const { hashPassword } = require('../middleware/hashPassword')

router.get('/', (req, res) => {
    res.send({
        statusCode: 200,
        payload: {
            msg: "The guest routes is healthy and running"
        },
    }).status(200)
})


/** Create Querry
 * @api {post} /guest/createQuerry Create Querry
 * @apiName Create Querry
 * @apiGroup Guest
 *
 * @apiParam {String} userName User Name
 * @apiParam {String} userID Email ID
 * @apiParam {String} message Querry
 * @apiParam {String} fcmToken FCM Device Token
 * 
 *
 */ // Create Querry
router.post('/createQuerry', hashPassword, (req, res) => {
    guestControl.createQuerry(req.body)
        .then((obj) => res.send(obj).status(201))
        .catch((err) => res.send(err).status(400))
})



/** Register Guest
 * @api {post} /guest/register Guest Register
 * @apiName Register
 * @apiGroup Guest
 *
 * @apiParam {String} userName User Name
 * @apiParam {String} userID Email ID
 * @apiParam {String} message Querry
 * @apiParam {String} fcmToken FCM Device Token
 * 
 *
 */ // Register Guest
router.post('/register', hashPassword, (req, res) => {
    guestControl.register(req.body)
        .then((obj) => res.send(obj).status(201))
        .catch((err) => res.send(err).status(400))
})

module.exports = router;