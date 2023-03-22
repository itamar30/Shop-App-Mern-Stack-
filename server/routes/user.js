require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const CryptoJS = require("crypto-js");
const { verify } = require("jsonwebtoken");

// USER STATISTICS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE NEW USER
router.post("/", async (req, res) => {
  let newUSer = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  newUSer = await newUSer.save();
  console.log(newUSer);
  res.status(200).json(newUSer);
});

// UPDATE USER
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.JWT_SEC_KEY
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("following user was deleted : \n" + user);
  } catch (error) {
    res.status(500).json(error);
  }
});
// GET ALL USERS / LATEST NEW=TRUE
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const users = await User.find();
    const [password, ...props] = users;
    res.status(200).json(props);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const { password, ...props } = user._doc;
    res.status(200).json(props);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
