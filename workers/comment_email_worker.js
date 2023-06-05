// 2nd

const queue=require("../config/kue");

const commentsMailer =require('../mailers/comments_mailer')

queue.process('emails',function(job,done){
    console.log('emails workes is processing a job',job.data);

    commentsMailer.newComment(job.data);
    done();
})

// go to the "comments_controller.js"