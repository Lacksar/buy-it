const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({

    title: { required: true, type: String },
    slug: { required: true, type: String, unique: true },
    desc: { required: true, type: String },
    image: { required: true, type: String },
    category: { required: true, type: String },
    size: { type: String },
    color: { type: String },
    price: { required: true, type: Number },
    availableQuantity: { required: true, type: Number },


}, { timestamps: true })

mongoose.models = {}

export default mongoose.model("Product", ProductSchema);