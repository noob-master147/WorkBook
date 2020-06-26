const { Post } = require('../models/postSchema')




const createPost = (obj) => {
    return new Promise(async(resolve, reject) => {
        newPost = new Post({
            createdBy: obj.createdBy,
            content: obj.content,
            mediaUrl: obj.mediaUrl
        })
        await newPost.save()
            .then(() => {
                console.log(chalk.green.bold("New Post Saved!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "New Post Saved!",
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Saving Post!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Saving Post",
                        err: err
                    }
                })
            })

    })
}


const deletePost = (obj) => {
    return new Promise(async(resolve, reject) => {
        await Post.findByIdAndDelete(obj.id)
            .then(() => {
                console.log(chalk.green.bold("Post Deleted!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Post Deleted!",
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Deleteing Post!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Deleting Post",
                        err: err
                    }
                })
            })

    })
}


const enablePost = (obj) => {
    return new Promise(async(resolve, reject) => {
        await Post.findByIdAndUpdate(obj.id, {
                enabled: true
            }, {
                new: true
            })
            .then((newPost) => {
                console.log(chalk.green.bold("Post Enabled!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Post Enabled!",
                        post: newPost
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Post Enabled!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Post Enabled",
                        err: err
                    }
                })
            })

    })
}


const disablePost = (obj) => {
    return new Promise(async(resolve, reject) => {
        await Post.findByIdAndUpdate(obj.id, {
                enabled: false
            }, {
                new: true
            })
            .then(() => {
                console.log(chalk.green.bold("Post Disabled!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Post Disabled",
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Disabling Post!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Disabling Post",
                        err: err
                    }
                })
            })
    })
}


const updatePost = (obj) => {
    return new Promise(async(resolve, reject) => {

    })
}



module.exports = {
    createPost,
    deletePost,
    enablePost,
    disablePost,
    updatePost
}











.then(() => {
        console.log(chalk.green.bold("!"))
        resolve({
            statusCode: 200,
            payload: {
                msg: "",
            }
        })
    })
    .catch((err) => {
        console.log(chalk.red.bold("Error in !"))
        reject({
            statusCode: 400,
            payload: {
                msg: "Error in ",
                err: err
            }
        })
    })