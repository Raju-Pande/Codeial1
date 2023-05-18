const mongoose = require('mongoose');
const { post } = require('../../Codeial/routes');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true // created at and updated at here use
})


const Post = mongoose.model('Post', postSchema);

module.exports = Post;