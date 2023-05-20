const Post = require('../models/post');
const User = require("../models/user");
module.exports.home = function (req, res) {
    // console.log(req.cookies);
    // res.cookie('user_id',25);


    // post 
    //  only here post showing 
    // Post.find({})
    //     .then((posts) => {
    //         return res.render('home', {
    //             title: "Codeail | Home",
    //             posts: posts
    //         })
    //     })

    // when you want to every post fetch the user id email id time
    // populate the user of each post
    Post.find({})
        .populate('user')
        // showing comment on home
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec()
        .then((posts) => {

            User.find({})
            .then((users) => {
                return res.render('home', {
                    title: "Codeial | Home",
                    posts: posts,
                    all_users:users
                });
            })

        })

}