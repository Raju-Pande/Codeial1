const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // inculde the array of ids of all comments in this post itself
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
]
},
    {
        timestamps: true // created at and updated at here use
    })


const Post = mongoose.model('Post', postSchema);

module.exports = Post;