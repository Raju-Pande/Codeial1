const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    // comment belongs to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        require: true
    }
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;