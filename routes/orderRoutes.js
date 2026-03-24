const express = require("express");
const { createOrder } = require("../controllers/orderController");

const router = express.Router();

// Route: POST /order
router.post("/", createOrder);

module.exports = router;
