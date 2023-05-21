
const User = require("../models/user")
// const fs= require('fs');
// const path=require('path');

// module.exports.profile = function(req, res){
//     return res.render('user_profile', {
//         title: 'User Profile'
//     })
// }


// user profile link
module.exports.profile = function(req, res){
    User.findById(req.params.id)
    .then((user)=>{
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user:user
        });
    })
}


//  update profile name

    module.exports.update=function(req, res){
        if(req.user.id == req.params.id){
            User.findByIdAndUpdate(req.params.id, req.body)
            .then((user)=>{
                return res.redirect('back');
            });
        }else{
            return res.status(401).send('Unauthorized')
        }
    }
   




//render the sign up page
module.exports.signUp = function (req, res) {

    if(req.isAuthenticated()){
      return  res.redirect('/user/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


//render thr sign in page
module.exports.signIn = function (req, res) {

    if(req.isAuthenticated()){
       return res.redirect('/user/profile');
    }

    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

//get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back')
    }

    User.findOne({ email: req.body.email })
        .catch((err) => {
            console.log('error ni finding user in signing up');
            return;
        })
        .then((user) => {
            if (!user) {
                return User.create(req.body);
            }
        })
        .catch((err) => {
            console.log('User already exists');
        })

        .then((user) => {
            return res.redirect('/user/sign-in');
        })
        .catch((err) => {
            console.log('Error: ', err);
            return res.redirect('back');
        });

}


// sign in and create a session for the user

module.exports.createSession = function (req, res) {
    req.flash('success','Logged in Successfully')
    return res.redirect('/');

}

// signout

module.exports.destroySession=function(req,res){
   
        req.logout(req.user, err => {
            req.flash('success','Logged Out Successfully')
          if(err) return next(err);
          res.redirect("/");
        });
    
}