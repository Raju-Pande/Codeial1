const Post = require('../models/post')

module.exports.home = function (req, res) {
    // console.log(req.cookies);
    // res.cookie('user_id',25);


    // post
    // Post.find({})
    //     .then((posts) => {
    //         return res.render('home', {
    //             title: "Codeail | Home",
    //             posts: posts
    //         })
    //     })

        // when you want to every post fetch the user id email id time
        // populate the user of each post
        Post.find({}).populate('user').exec().then((posts) => {
            return res.render('home', {
                title: "Codeial | Home",
                posts: posts
            });
        })

}