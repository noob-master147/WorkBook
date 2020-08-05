const chalk = require('chalk')
const router = require("express")();
const driverControl = require('../controllers/driverControl')
const { hashPassword } = require('../middleware/hashPassword')
const { authenticate } = require('../middleware/authenticate')


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
    console.log(chalk.yellow.bold("\n/driver/register route hit..."))
    driverControl.register(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})



/** Update Driver
 * @api {post} /driver/updateDriver Update Driver
 * @apiName Update Driver
 * @apiGroup Driver
 *
 * @apiParam {String} userName User Name
 * @apiParam {String} carNumber Car Number
 * @apiParam {Number} adharNumber Adhar Number
 * @apiParam {Number} contactNumber Contact Number
 * @apiParam {String} fcmToken FCM Device Token
 * 
 */ // Update Driver
router.post('/updateDriver', (req, res) => {
    console.log(chalk.yellow.bold("\n/driver/updateDriver route hit..."))
    driverControl.updateDriver(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})




/** Update Driver Location
 * @api {post} /driver/updateLocation Update Driver Location
 * @apiName Update Driver Location
 * @apiGroup Driver
 *
 * @apiParam {String} userID User Id of driver
 * @apiParam {String} id _id of Driver
 * @apiParam {String} jwtToken JWT token of Driver
 * @apiParam {Object} location Object of Location
 * 
 */ // Update Driver Location
router.post('/updateLocation', authenticate, (req, res) => {
    console.log(chalk.yellow.bold("\n/driver/updateLocation route hit..."))
    driverControl.updateLocation(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})



/** Get Driver Location
 * @api {post} /driver/getLocation Get Driver Location
 * @apiName Get Driver Location
 * @apiGroup Driver
 *
 * @apiParam {String} routeName
 * @apiParam {String} userID User ID of User 
 * @apiParam {String} jwtToken JWT token of User
 * 
 */ // Get Driver Location
router.post('/getLocation', authenticate, (req, res) => {
    console.log(chalk.yellow.bold("\n/driver/getLocation route hit..."))
    driverControl.getLocation(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})




module.exports = router;