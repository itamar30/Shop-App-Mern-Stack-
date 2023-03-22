const express = require("express");
const mongoose = require("mongoose");

const ProsuctSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: Array },
    color: { type: Array },
    size: { type: Array },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProsuctSchema);
