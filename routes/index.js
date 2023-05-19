const express=require("express")
// const pasport=require('passport')
const router=express.Router();


const homeController = require('../controllers/home_controller');

console.log('router loaded');


router.get('/', homeController.home);
router.use('/user',require('./users'))

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


// Post
router.use('/posts',require('./post'))



module.exports=router;