const create = (user) => {
    return new Promise((resolve, reject) => {
        console.log("Adding New User")
        console.log(user)
        resolve()
    })
}

module.exports = {
    create
}