require("dotenv").config();
const mailgun = require("mailgun-js");

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const sendWelcomeEmail = (email, OTP) => {
  const data = {
    from: `No-Reply <${process.env.MAILGUN_EMAIL}>`,
    to: email,
    subject: "Welcome to BAAS",
    text: `Welcome to BaaS. Use code ${OTP} to verify your email`,
  };

  mg.messages().send(data, (error, body) => {
    console.log("Message sent!\nBody =>", body);
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
