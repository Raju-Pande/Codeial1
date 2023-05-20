const Post = require('../models/post');
const Comment = require('../models/comment')

module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    })
        .then((post) => {
            return res.redirect('back');
        })
        .catch((err) => {
            console.log('Error in creating a post');
            return;
        })
}



// delete post 
// using promise
module.exports.destroy = function (req, res) {
    Post.findById(req.params.id)
        .then((post) => {
            // .id means converting the object id into string
            if (post.user == req.user.id) {
                post.deleteOne();
                Comment.deleteMany({ post: req.params.id })
                    .then(() => {
                        return res.redirect('/');
                    })
                    .catch((err) => {
                        return res.redirect('/');
                    })
            }
        })
        .catch((err) => {
            return res.redirect('/');
        });
} 