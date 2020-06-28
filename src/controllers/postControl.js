const { Post } = require('../models/postSchema')
const chalk = require('chalk')
const { ObjectID } = require('mongodb')

const createPost = (obj) => {
    return new Promise(async(resolve, reject) => {
        const id = new ObjectID()
        newPost = new Post({
            _id: id,
            createdBy: obj.createdBy,
            content: obj.content,
            mediaUrl: obj.mediaUrl,
            mediaType: obj.mediaType
        })
        await newPost.save()

        .then(() => {
                console.log(chalk.green.bold("New Post Saved!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "New Post Saved!",
                        _id: id
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
            .then((newPost) => {
                console.log(chalk.green.bold("Post Disabled!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Post Disabled",
                        pst: newPost
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
        await Post.findByIdAndUpdate(obj.id, {
                content: obj.content,
                mediaUrl: obj.mediaUrl,
                mediaType: obj.mediaType,
                enabled: true
            }, {
                new: true
            })
            .then((newPost) => {
                console.log(chalk.green.bold("Post Updated!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Post Updated",
                        post: newPost
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Updating Post!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Updating Post",
                        err: err
                    }
                })
            })
    })
}





const viewAllPost = () => {
    return new Promise(async(resolve, reject) => {
        await Post.find()
            .then((allPost) => {
                console.log(chalk.green.bold("All Post Fetched!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "All Post Fetched",
                        post: allPost
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Fetching Post!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Fetching Post",
                        err: err
                    }
                })
            })
    })
}



const like = (obj) => {
    return new Promise(async(resolve, reject) => {
        await Post.findByIdAndUpdate(obj.id, {
                $inc: {
                    likes: 1
                },
                $push: {
                    likedBy: [{
                        userName: obj.userName,
                        userID: obj.userID
                    }]
                }
            }, {
                new: true
            })
            .then((post) => {
                console.log(chalk.green.bold("Post Liked!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Post Liked",
                        post: post
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Liking Post!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Liking Post",
                        err: err
                    }
                })
            })

    })
}





const comment = (obj) => {
    return new Promise(async(resolve, reject) => {
        await Post.findByIdAndUpdate(obj.id, {
                $push: {
                    comments: [{
                        userName: obj.userName,
                        comment: obj.comment
                    }]
                }
            }, {
                new: true
            })
            .then((post) => {
                console.log(chalk.green.bold("Post Commented!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Post Commented",
                        post: post
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Commenting Post!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Commenting Post",
                        err: err
                    }
                })
            })
    })
}




const deleteAllPost = () => {
    return new Promise(async(resolve, reject) => {
        await Post.remove({}, function(err) {
                console.log(chalk.red.bold('Post collection removed'))
            })
            .then((post) => {
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Post collection removed",
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error Post collection removed!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in  Removing Post collection",
                        err: err
                    }
                })
            })
    })
}




const updateViews = (obj) => {
    return new Promise(async(resolve, reject) => {
        await Post.findByIdAndUpdate(obj.id, {
                $inc: {
                    views: 1
                }
            }, {
                new: true
            })
            .then((post) => {
                console.log(chalk.green.bold("Views updated on Post!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Views updated on Post",
                        post: post
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Updating Post Post!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Updating Post Post",
                        err: err
                    }
                })
            })

    })
}






const enableComment = (obj) => {
    return new Promise(async(resolve, reject) => {
        await Post.findByIdAndUpdate(obj.id, {
                commentEnabled: true
            }, {
                new: true
            })
            .then((newPost) => {
                console.log(chalk.green.bold("Comments Enabled!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Comments Enabled!",
                        post: newPost
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Enabling Comments!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Enabling Comments",
                        err: err
                    }
                })
            })

    })
}


const disableComment = (obj) => {
    return new Promise(async(resolve, reject) => {
        await Post.findByIdAndUpdate(obj.id, {
                commentEnabled: false
            }, {
                new: true
            })
            .then((newPost) => {
                console.log(chalk.green.bold("Comments Disabled!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Comments Disabled",
                        pst: newPost
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Disabling Comments!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Disabling Comments",
                        err: err
                    }
                })
            })
    })
}






module.exports = {
    createPost,
    deletePost,
    enablePost,
    disablePost,
    updatePost,
    viewAllPost,
    deleteAllPost,
    like,
    comment,
    updateViews,
    enableComment,
    disableComment
}