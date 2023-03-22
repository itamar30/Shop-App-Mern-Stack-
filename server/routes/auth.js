require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

//register
router.post("/register", async (req, res) => {
  let newUSer = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC_KEY
    ).toString(),
  });
  try {
    newUSer = await newUSer.save();

    res.status(201).send(newUSer);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(404).send("username not found");

    const hasshedpassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC_KEY
    );
    const originalPassword = hasshedpassword.toString(CryptoJS.enc.Utf8);
    originalPassword !== req.body.password &&
      res.status(400).send("Wrong password");

    const accesToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC_KEY
    );
    const { password, ...props } = user._doc;
    res.status(200).send({ ...props, accesToken });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
