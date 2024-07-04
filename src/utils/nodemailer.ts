import nodemailer from 'nodemailer'

let transporter  = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use TLS
    auth: {
      user: process.env.EMAIL_APP_GMAIL,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  
  export default transporter