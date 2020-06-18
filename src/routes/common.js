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
router.post('/uploadPicture', getUser, upload.single('profileImage'), (req, res) => {
    console.log(chalk.bold.yellow("Upload Picture Route Hit!"))
    commonControl.uploadPicture(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


module.exports = router;