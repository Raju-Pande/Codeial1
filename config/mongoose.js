const mongoose=require("mongoose");

mongoose.connect('mongodb://0.0.0.0:27017/Manual_Authenction')

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to MongoDB"));

db.once('open',function(){
    console.log("Connected to database Mongodb");
})

module.exports=db;