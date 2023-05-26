
const Post=require('../../../models/post')
module.exports.index= async function(req, res){

    let posts = await Post.find({})
            // letest post first showing Ajax
            .sort('-createdAt')

            .populate('user')
            // showing comment on home
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
    return res.json(200,{
        message:"List of posts",
        posts:[]
    })
}


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
