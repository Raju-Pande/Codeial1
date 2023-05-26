
const Comment = require('../models/comment');
const Post = require('../models/post');
// module.exports.create = function (req, res) {
//     Post.findById(req.body.post).then((post) => {
//         Comment.create({
//             content: req.body.content,
//             post: req.body.post,
//             user: req.user._id,
//         }).then((comment) => {
//             post.comments.push(comment);
//             post.save();

//             res.redirect('/');
//         });
//     });
// };



// async

module.exports.create = async function (req, res) {
	try {
		let post = await Post.findById(req.body.post);
		if (!post) {
			throw new Error('Post not found');
		}

		let comment = await Comment.create({
			content: req.body.content,
			post: req.body.post,
			user: req.user._id,
		});

		post.comments.push(comment);
		await post.save();

		if (req.xhr) {
			// Similar for comments to fetch the user's id!
			comment = await comment.populate('user', 'name')
			return res.status(200).json({
				data: {
					comment: comment,
				},
				message: 'Post created!',
			});
		}

		req.flash('success', 'Comment published!');
		res.redirect('/');
	} catch (err) {
		req.flash('error', err);
		return;
	}
};



// delete comment

// promise

// module.exports.destroy = function (req, res) {
//     Comment.findById(req.params.id).then((comment) => {
//         if (comment.user == req.user.id) {
//             let postId = comment.post;
//             comment.deleteOne();

//             Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } })
//                 .then((post) => {
//                     return res.redirect('/');
//                 })
//                 .catch((err) => {
//                     return res.redirect('/');
//                 })
//         }
//     })
//         .catch((err) => {
//             return res.redirect('/');
//         });
// }


// Async
module.exports.destroy = async function (req, res) {
	try {
		const comment = await Comment.findById(req.params.id);
		if (!comment) {
			throw new Error('Comment not found');
		}

		if (comment.user.toString() !== req.user.id) {
			req.flash('error', 'Unauthorized');
			return res.redirect('back');
		}

		const postId = comment.post;
		await comment.deleteOne();
		await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

		if (req.xhr) {
			return res.status(200).json({
				data: {
					comment_id: req.params.id,
				},
				message: 'Comment deleted',
			});
		}

		req.flash('success', 'Comment deleted!');
		res.redirect('back');
	} catch (err) {
		req.flash('error', err.message);
		return;
	}
};