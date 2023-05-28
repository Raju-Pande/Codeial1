const express=require("express");
const router=express.Router();
const pasport=require("passport")
const postsApi=require("../../../controllers/api/v1/post_api")

router.get('/',postsApi.index)
router.delete('/:id',pasport.authenticate('jwt',{session:false}),postsApi.destroy);

module.exports=router;  