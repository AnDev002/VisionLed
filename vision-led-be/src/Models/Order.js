const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  orderItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductDetails",
    required: true,
  },
  ],
  createdAt: { type: Date, required: true, default: Date.now },
  // totalPrice: { type: Number, required: true },
  status: { type: String, required: true, default: "PENDING" },
  deliveryAt: { type: Date, required: false },
  paidAt: { type: Date, required: false },
  paymentMethod: { type: String, required: true, default: "COD" },
  description: { type: String, required: false },
  customer: {
    type: mongoose.Schema.Types.ObjectId, ref: "User",
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
