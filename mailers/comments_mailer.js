// const nodemailer = require("../config/nodemailer")


// // this is another way of exporting a method
// exports.newComment= async (comment)=>{
//     // console.log('inside newComment mailer',comment);

//     // template
//     let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

//     nodemailer.transporter.sendMail({
//         from:"rpande400@gmail.com",
//         to:comment.user.email,
//         subject:"New Comment Publish!",
//         // html:"<h1> hi raj</h1>"
//         html:htmlString
//     },
//     async(err, info) => {
//         if (err){
//             console.log('Error in sending mail', err);
//             return;
//         }

//         console.log('Message sent', info);
//         return;
//     });
// }

// //2)  commemts_controllers




const nodemailer = require("../config/nodemailer");

exports.newComment = async (comment) => {
  try {
    const htmlString = await nodemailer.renderTemplate({ comment }, "/comments/new_comment.ejs");

    await nodemailer.transporter.sendMail({
      from: "rpande400@gmail.com",
      to: comment.user.email,
      subject: "New Comment Published!",
      html: htmlString,
    });

    console.log("Message sent successfully");
  } catch (error) {
    console.log("Error in sending mail", error);
  }
};
