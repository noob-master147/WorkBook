const router = require("express")();
const chalk = require('chalk')

//route to create for a user
router.post('/', (req, res) => {
    userControls.createUser(req.user)
        .then(resp => res.status(200).send(resp))
        .catch(err => res.status(400).send(err))
})