const router = require("express")();
const chalk = require('chalk')
const commonControl = require('../controllers/commonControl')
const { getUser } = require('../middleware/getUser')
const { upload } = require('../middleware/multerUpload')


/** Send Notification
 * @api {post} /sendNotification Send Notifications
 * @apiName Send Notifications
 * @apiGroup Common
 *
 * @apiParam {String} fcmToken FCM Device Token
 * @apiParam {String} message Notification Message
 * 
 *   
 */ //Send Notification
router.post('/sendNotification', (req, res) => {
    console.log(chalk.bold.yellow("SendNotification Route Hit!"))
    commonControl.sendNotification(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})




/** Login Route
 * @api {post} /login Login
 * @apiName View All Employees
 * @apiGroup Common
 * 
 * @apiParam {String} fcmToken fcmToken FCM Device Token
 * @apiParam {String} userID Email ID of the User
 * @apiParam {String} password Password
 *   
 */ // Login Route
router.post('/login', getUser, (req, res) => {
    console.log(chalk.bold.yellow("Login Route Hit!"))
    commonControl.login(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})





/** Upload Profile Picture
 * @api {post} /uploadPicture Upload Profile Picture
 * @apiName Upload Profile Picture
 * @apiGroup Common
 * 
 * @apiParam {String} userID Email ID of the User
 * @apiParam {File} profilePicture Profile Picture
 *   
 */ // Upload Profile Picture
router.post('/uploadPicture', upload.single('profilePicture'), getUser, (req, res) => {
    console.log(chalk.bold.yellow("Upload Picture Route Hit!"))
    commonControl.uploadPicture(req)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})




/** Get Profile Picture
 * @api {get} /getUserProfile/:role/:id Fetch Profile Picture
 * @apiName Fetch Profile Picture
 * @apiGroup Common
 * 
 *   
 */ // Get Profile Picture
router.get('/getUserProfile/:role/:id', (req, res) => {
    console.log(chalk.bold.yellow("Fetch Picture Route Hit!"))
    commonControl.getUserProfile(req.params)
        .then((obj) => res.set('Content-Type', 'image/png').send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})




/** Get Institute Picture
 * @api {get} /getInstituteProfile/:instituteName Fetch Profile Picture
 * @apiName Fetch Institute Profile Picture
 * @apiGroup Common
 * 
 *   
 */ // Get Institute Picture
router.get('/getInstituteProfile/:instituteName', (req, res) => {
    console.log(chalk.bold.yellow("Fetch Picture Route Hit!"))
    commonControl.getInstituteProfile(req.params)
        .then((obj) => res.set('Content-Type', 'image/png').send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})







module.exports = router;