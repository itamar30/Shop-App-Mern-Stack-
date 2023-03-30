require("dotenv").config();
const express = require("express");
const router = express.Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const CryptoJS = require("crypto-js");
const Order = require("../models/Order");

// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted.../n" + order);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL ORDERS ONLY ADMIN
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ORDERS BY USERID
router.get("/find/:userId", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET SALES FOR PRODUCTID

router.get("/finding/:id", async (req, res) => {
  const income = await Order.aggregate([
    {
      $unwind: "$products",
    },
    {
      $match: {
        "products._id": req.params.id,
      },
    },
    {
      $group: {
        _id: null,
        suma: { $sum: "$products.quantity" },
      },
    },
  ]);
  res.status(200).json(income);
});

// how many trnsaction includes the item

router.get("/findProductsById/:id", async (req, res) => {
  let sum = 0;
  let income = await Order.aggregate([
    {
      $match: { "products._id": req.params.id },
    },
    {
      $project: {
        month: { $month: "$createdAt" },
        total: "$products.quantity",
        _id: 0,
      },
    },
  ]);
  res.status(200).json(income);
});

router.get("/ordersByMonth", async (req, res) => {
  let income = await Order.aggregate([
    {
      $project: {
        _id: 0,
        month: { $month: "$createdAt" },
        total: "$total",
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: "$total" },
      },
    },
  ]);
  res.status(200).json(income);
});

module.exports = router;
