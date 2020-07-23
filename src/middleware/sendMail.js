const sgMail = require('@sendgrid/mail');

const chalk = require('chalk')


const sendMail = (obj) => {
    return new Promise(async(resolve, reject) => {
        try {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        } catch (error) {
            console.log(chalk.red.bold(error))
            reject({
                "status": 400,
                "payload": {
                    "status": 400,
                    "msg": "API incorrect"
                }
            })
        }
        console.log(chalk.green.bold('Sending Email...\n'))
        const sender = process.env.SENDER_EMAIL

        const userObj = {
            mail: obj.mail,
            token: obj.token
        }
        generateMessage(userObj, sender)
        resolve()

    })
}


const generateMessage = async(user, sender) => {
    const msg = {
        to: user.mail,
        from: sender,
        subject: "Reset Password",
        text: ` Your One Time Password is ${user.token}`
    }
    await sgMail.send(msg)
        .then((obj) => {
            console.log(`Mail Sent to ${user.mail}`)
            return true
        })
        .catch((err) => {
            console.log('Error:', err)
            return false

        })
}





module.exports = { sendMail }