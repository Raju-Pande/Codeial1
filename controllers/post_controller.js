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



module.exports.create = async function (req, res) {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        req.flash('success','Post Published');
        return res.redirect('back');
    } catch (err) {
        req.flash('error',err);
        return res.redirect('back');
    }
}


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
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        if (post.user == req.user.id) {
            post.deleteOne();
            await Comment.deleteMany({ post: req.params.id })

            req.flash('success','Post and Associated comments deleted');
            return res.redirect('back');
        } else {
            req.flash('error','You cannot delete this post!');
            return res.redirect('back');
        }

    } catch (err) {
        req.flash('error',err);
        return res.redirect('back');
    }
} 