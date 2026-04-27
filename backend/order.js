const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: String,
  service: String,
  clothes: Number,
  status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Order", OrderSchema);