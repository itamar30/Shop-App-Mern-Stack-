const express = require("express");
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    usernname: { type: String },
    userImg: { type: String },
    products: { type: Array },
    total: { type: Number, required: true },
    status: { type: String, default: "approved" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
