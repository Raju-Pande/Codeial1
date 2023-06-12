//use passport module
const passport = require('passport');

const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user')

const env =require('./environment');

// tell passport to use a new strategy for google log in
passport.use(
	new googleStrategy(
		{
			//we pass options
			clientID:env.google_client_id ,
			clientSecret: env.google_client_secret,
			callbackURL: env.google_call_back_URL
		},
        //accessToken create by google 
        // like jwt header
        //when your accessToken get expire then refreshToken come's with new token
        //without asking to the user to log in again
        async function (accessToken, refreshToken, profile, done) {
            try {
                //profile will contain the user information
                //match the user email within the DB
                //finding user
                const user = await User.findOne({
                    email: profile.emails[0].value,
                });
                console.log(accessToken, refreshToken);
                console.log(profile);
                if (user) {
                    //if found set this user as req.user
                    return done(null, user);
                } else {
                    //if user is not(mean user is not in system)
                    //there then need to create identity of user and
                    // set it as req.user(mean signIn that user)
                    const newUser = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString("hex"),
                    });

                    return done(null, newUser);
                }
            } catch (err) {
                console.log(err, `error in google strategy passport`);
                return done(err, null);
            }
        }
    )
);

module.exports = passport;