const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const useRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
mongoose.set("strictQuery", false);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("DB connected succefully");
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });

//moddlewares & routes
app.use(express.json());
app.use(cors());
app.use("/api/users", useRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/stripe", stripeRoute);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
