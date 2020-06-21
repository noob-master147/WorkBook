const chalk = require('chalk')
const router = require("express")();
const driverControl = require('../controllers/driverControl')
const { hashPassword } = require('../middleware/hashPassword')

router.get('/', (req, res) => {
    res.send({
        statusCode: 200,
        payload: {
            msg: "The driver routes is healthy and running"
        },
    }).status(200)
})


/** Register Driver
 * @api {post} /driver/register Driver Register
 * @apiName Register
 * @apiGroup Driver
 *
 * @apiParam {String} userName User Name
 * @apiParam {String} userID Email ID
 * @apiParam {String} password Password
 * @apiParam {String} instituteName Name of The Institute
 * @apiParam {String} carNumber Car Number
 * @apiParam {Number} adharNumber Adhar Number
 * @apiParam {Number} contactNumber Contact Number
 * @apiParam {String} fcmToken FCM Device Token
 * 
 *
 */ // Register driver
router.post('/register', hashPassword, (req, res) => {
    driverControl.register(req.body)
        .then((obj) => res.send(obj).status(201))
        .catch((err) => res.send(err).status(400))
})



/** Update Driver
 * @api {post} /driver/register Update Driver
 * @apiName Register
 * @apiGroup Driver
 *
 * @apiParam {String} userName User Name
 * @apiParam {String} carNumber Car Number
 * @apiParam {Number} adharNumber Adhar Number
 * @apiParam {Number} contactNumber Contact Number
 * @apiParam {String} fcmToken FCM Device Token
 * 
 */ // Update Driver
router.post('/update', (req, res) => {
    driverControl.updateCustomer(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


module.exports = router;