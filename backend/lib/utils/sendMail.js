import nodemailer from "nodemailer";

// nodemailer send email to user by email
export function sendMail(email, subject, message) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "alibabattying@gmail.com",
        pass: "noka rlfz zkdw dbdk" // this app password
      }
    });
    const mail_config = {
        from: "alibabattying@gmail.com",
        to: email,
        subject: subject,
        text: message
    }
    transporter.sendMail(mail_config, (error, info) => {
        if (error) {
            console.log(error);
            return reject({message: "An Error During Sending email"});
        }
        return resolve({message: "Email Send Successfully"});
    });
  });
}
