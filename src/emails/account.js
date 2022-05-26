require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, OTP) => {
 sgMail.send({
  to: email,
  from: "vanshukakkar3@gmail.com",
  subject: "Verification OTP",
  text: `Welcome to BasS. Your verification code is ${OTP}.`,
 });
};

const sendCancelationEmail = (email, name) => {
 sgMail.send({
  to: email,
  from: "andrew@mead.io",
  subject: "Sorry to see you go!",
  text: `Goodbye, ${name}. I hope to see you back sometime soon.`,
 });
};

module.exports = {
 sendWelcomeEmail,
 sendCancelationEmail,
};
