const nodemailer = require("nodemailer");


module.exports = async function sendMail(data){
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "houssemrg00@gmail.com", //change to Anpe host email
          pass: "aedf rnjk zahx bakt",
        },
      });
        const message = {
          from: ` ${data.firstName}  ${data.lastName}  <${data.email}>`, 
          to: "rgaieghoussem12@gmail.com", //change to email of the receiver which is anpe email
          subject: data.subject, 
          text: data.text, 
          
        };
      
        await transporter.sendMail(message,(err,info)=>{
          if(err){
              return err;
          }else{
              return info;
              
          }
        });
      
}

