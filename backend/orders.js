const router = require("express").Router();
const Order = require("../models/Order");

// Create order
router.post("/", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json(order);
});

// Get all orders (admin)
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// Update status
router.put("/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(order);
});

module.exports = router;