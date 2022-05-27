const express = require("express");
const User = require("../models/user");
const OTP = require("../models/opt");
const auth = require("../middleware/auth");
const { sendWelcomeEmail, sendCancelationEmail } = require("../emails/account");
const router = new express.Router();

// Register the user
router.post("/users/register", async (req, res) => {
  const otpUser = await OTP.findOne({ email: req.body.email });
  if (!otpUser) return res.status(404).json({ message: "User OTP not found" });

  if (otpUser.OTP != req.body.OTP)
    return res.json({ message: "Incorrect Otp" });

  const user = new User(req.body);
  user.emaiVerified = true;
  try {
    await user.save();

    //   const token = await user.generateAuthToken();
    res.status(201).json({ message: "User signed up" });
  } catch (e) {
    console.log("error at register", e);
    res.status(400).send(e);
  }
});

// login for user
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    if (!user.emaiVerified)
      return res
        .status(401)
        .json({ message: "Email not verified. Please verify your email" });
    const token = await user.generateAuthToken();
    res.json({ user, token });
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/send-otp", async (req, res) => {
  let Otp = Math.floor(1000 + Math.random() * 9000);
  const email = req.query.email;

  const existingUser = await OTP.findOne({ email });

  if (existingUser) {
    existingUser.OTP = Otp;
    await existingUser.save();
  } else {
    const newotp = {
      email,
      OTP: Otp,
    };

    const otp = new OTP(newotp);
    await otp.save();
  }

  sendWelcomeEmail(email, Otp);
  return res.json({
    message: "OTP sent successfuly",
  });
});

module.exports = router;
