const router = require("express")();
const chalk = require('chalk')


router.post('/', (req, res) => {
    userControls.createUser(req.user)
        .then(resp => res.status(200).send(resp))
        .catch(err => res.status(400).send(err))
})