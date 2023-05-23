const Post = require('../models/post');
const Comment = require('../models/comment')

// promises

// module.exports.create = function (req, res) {
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     })
//         .then((post) => {
//             return res.redirect('back');
//         })
//         .catch((err) => {
//             console.log('Error in creating a post');
//             return;
//         })
// }



// async

// if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!


// By using async await
module.exports.create = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if (req.xhr) {
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await Post.findById(post._id).populate('user');
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created"
            });
        }

        req.flash('success', 'Post created!');
    } catch (err) {
        console.log('Error:', err);
        req.flash('error', 'Error creating post');
    }

    if (req.xhr) {
        return res.status(500).json({
            error: 'Error creating post'
        });
    }

    return res.redirect('back');
};



// delete post 

// using promise
// module.exports.destroy = function (req, res) {
//     Post.findById(req.params.id)
//         .then((post) => {
//             // .id means converting the object id into string
//             if (post.user == req.user.id) {
//                 post.deleteOne();
//                 Comment.deleteMany({ post: req.params.id })
//                     .then(() => {
//                         return res.redirect('/');
//                     })
//                     .catch((err) => {
//                         return res.redirect('/');
//                     })
//             }
//         })
//         .catch((err) => {
//             return res.redirect('/');
//         });
// } 



// Async

module.exports.destroy = async function (req, res) {
    try {
        const post = await Post.findById(req.params.id);

        if (post.user == req.user.id) {
            await post.deleteOne();
            await Comment.deleteMany({ post: req.params.id });

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Post and associated comments deleted');
        } else {
            req.flash('error', 'You cannot delete this post!');
        }
    } catch (err) {
        req.flash('error', err);
    }

    return res.redirect('back');
};
