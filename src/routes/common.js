const router = require("express")();
const chalk = require('chalk')
const commonControl = require('../controllers/commonControl')
const { getUser } = require('../middleware/getUser')
const { upload } = require('../middleware/multerUpload')

// Send Notification
router.post('/sendNotification', (req, res) => {
    console.log(chalk.bold.yellow("SendNotification Route Hit!"))
    commonControl.sendNotification(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


// Login Route
router.post('/login', getUser, (req, res) => {
    console.log(chalk.bold.yellow("Login Route Hit!"))
    commonControl.login(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})

// Upload Profile Picture Route
router.post('/uploadPicture', upload.single('profilePicture'), getUser, (req, res) => {
    console.log(chalk.bold.yellow("Upload Picture Route Hit!"))
    commonControl.uploadPicture(req)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


// Get Profile Picture
router.get('/getProfile/:role/:id', (req, res) => {
    console.log(chalk.bold.yellow("Fetch Picture Route Hit!"))
    commonControl.getProfile(req.params)
        .then((obj) => res.set('Content-Type', 'image/png').send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})







module.exports = router;