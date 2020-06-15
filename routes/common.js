const router = require("express")();
const chalk = require('chalk')
const common = require('../controllers/commonControl')

// Send Notification
router.post('/sendNotification', (req, res) => {
    console.log(chalk.bold.yellow("SendNotification Route Hit!"))
    common.sendNotification(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})

module.exports = router;