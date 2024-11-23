const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { required: true, type: String },
    slug: { required: true, type: String, unique: true },
    desc: { required: true, type: String, default: "" },
    image: { required: true, type: String },
    category: { required: true, type: String },
    branchCategory: { type: String },
    size: { type: String },
    color: { type: String },
    price: { required: true, type: Number },
    actualPrice: { type: Number },
    discount: { type: Number },
    rating: { type: Number },
    availableQuantity: { required: true, type: Number },
    theme: { type: String },
    sell: { type: Number, default: 0 },
  },
  { timestamps: true }
);

mongoose.models = {};

export default mongoose.model("Product", ProductSchema);
