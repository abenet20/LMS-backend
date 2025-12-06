const nodemailer = require("nodemailer");

const mail = async(to, subject ,message) => {
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adadicho@gmail.com",
    pass: "ovzn nqqe swji hsrz", 
  },
});

let mailOptions = {
  from: "adadicho@gmail.com",
  to: to,
  subject: subject,
  text: message
};


transporter.sendMail(mailOptions, (err, info) => {
  if (err) return console.log(err);
  console.log("Email sent: " + info.response);
});

};

// mail("abeneterbelo@gmail.com", "s", "ss");

module.exports = {mail};