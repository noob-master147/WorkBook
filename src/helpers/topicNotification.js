const chalk = require('chalk')

const serviceAccount = require('../../firebase-key.json')
const admin = require("firebase-admin")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
})



const sendTopicNotification = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.bold.yellow("Sending Topic Notification..."))
        const payload = {
            notification: {
                title: obj.title,
                body: obj.message
            }
        }
        await admin.messaging().sendToTopic(obj.topic, payload)
            .then((response) => {
                console.log(chalk.bold.green("Topic Notification Sent!"))
                resolve(response)
            })
            .catch((err) => {
                console.log(chalk.red.bold("Notification Not Sent!"))
                reject(err)
            })
    })
}


module.exports = {
    sendTopicNotification
}