const multer = require('multer')

const upload = multer({
    limits: {
        fileSize: 1500000
    },
    fileFilter(req, file, cb) {
        console.log("file multer")
        if (!file.originalname.match(/\.(jpeg|png|jpg)$/))
            return cb(new Error('Please Upload an Image'))
        cb(undefined, true)
    }
})


module.exports = {
    upload
}