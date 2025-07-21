import nodemailer from "nodemailer";

// nodemailer send email to user by email
export function sendMail(email, subject, message) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // this app password
      }
    });
    const mail_config = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: message
    }
    transporter.sendMail(mail_config, (error, info) => {
        if (error) {
            
            return reject({message: "An Error During Sending email"});
        }
        return resolve({message: "Email Send Successfully"});
    });
  });
}
