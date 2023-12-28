const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    address: { type: Object, required: true },
    email: {type: String, required: true },
    contact: {type: String, required: true},
    status: { type: String, default: "pending" },
    userId: {type: String, required: true},
    totalPrice: {type: Number},
    id: {type:Number, required:false},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);