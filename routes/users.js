const express = require("express");
const router = express.Router();

// passport 
const passport = require("passport");

const userController = require('../controllers/users_controller')
console.log("router loaded");

router.get('/profile',passport.checkAuthentication, userController.profile);

router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);

router.post('/create', userController.create)

// router.post('/create-session', userController.createSession)


// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate('local', { failureRedirect: '/user/sign-in' }), userController.createSession)

// Sign Out

router.get('/sign-out',userController.destroySession)
module.exports = router;