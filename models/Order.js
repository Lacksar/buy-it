const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({

    userId: { type: String, required: true },
    orderId: { type: String, required: true, unique: true },
    products: [/*{
        productId: { type: String, required: true },
        quantity: { type: Number, default: 1 }

    }*/],

    address: { required: true, type: String },
    amount: { required: true, type: Number },
    status: { required: true, default: "pending", type: String },
    pincode: { required: true, type: Number }

}, { timestamps: true })

mongoose.models = {}
export default mongoose.model("Order", OrderSchema);