const router = require("express")();
const chalk = require('chalk')
const commonControl = require('../controllers/commonControl')
const { getUser } = require('../middleware/getUser')
const { upload } = require('../middleware/multerUpload')
const { signJWT } = require('../middleware/signJWT')

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
router.post('/login', signJWT, getUser, (req, res) => {
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
 */ // Get Profile Picture
router.get('/getUserProfile/:role/:id', (req, res) => {
    console.log(chalk.bold.yellow("Fetch Picture Route Hit!"))
    commonControl.getUserProfile(req.params)
        .then((obj) => res.set('Content-Type', 'image/png').send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})




/** Get Institute Picture
 * @api {get} /getInstituteProfile/:instituteName Fetch Institute Profile Picture
 * @apiName Fetch Institute Profile Picture
 * @apiGroup Common
 * 
 */ // Get Institute Picture
router.get('/getInstituteProfile/:instituteName', (req, res) => {
    console.log(chalk.bold.yellow("Fetch Picture Route Hit!"))
    commonControl.getInstituteProfile(req.params)
        .then((obj) => res.set('Content-Type', 'image/png').send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})





/** Get Institute Grades
 * @api {get} /fetchGrade/:instituteName Fetch Institute Grades
 * @apiName Fetch Institute Grades
 * @apiGroup Common
 * 
 */ // Get Grades
router.get('/fetchGrade/:instituteName', (req, res) => {
    console.log(chalk.bold.yellow("Fetch Grades Route Hit!"))
    commonControl.fetchGrade(req.params)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})



/** Get Institute Divisions
 * @api {get} /fetchGrade/:instituteName Fetch Institute Divisions
 * @apiName Fetch Institute Divisions
 * @apiGroup Common
 * 
 */ // Get Divisions
router.get('/fetchDivision/:instituteName', (req, res) => {
    console.log(chalk.bold.yellow("Fetch Divisions Route Hit!"))
    commonControl.fetchDivision(req.params)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})





/** Get Roles
 * @api {get} /getRoles Fetch Roles
 * @apiName Fetch Roles
 * @apiGroup Common
 * 
 */ // Get Roles
router.get('/getRoles', (req, res) => {
    console.log(chalk.bold.yellow("Fetch Roles Route Hit!"))
    commonControl.getRoles()
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})







module.exports = router;