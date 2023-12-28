const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true},
    desc: { type: String, required: true, },
    image: { type: String, default: ''},
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);
ProductSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

ProductSchema.set('toJSON', {
  virtuals: true,
});


module.exports = mongoose.model("Product", ProductSchema);