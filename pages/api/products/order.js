import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";
import User from "@/models/User";
import Product from "@/models/Product";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      // Decode user token
      const user = jwt.decode(req.body.token, process.env.SECRET_KEY);
      if (!user) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid user token" });
      }

      // Find the user
      const foundUser = await User.findById(user._id);
      if (!foundUser) {
        return res
          .status(400)
          .json({ success: false, error: "User not found" });
      }

      // Validate cart items
      let totalSum = 0;
      const cart = req.body.cart;

      for (const item in cart) {
        totalSum += cart[item].price * cart[item].qty;
        const product = await Product.findOne({ slug: item });

        // Check if product is in stock
        if (!product || product.availableQuantity < cart[item].qty) {
          return res.status(400).json({
            success: false,
            error: "Some item in your cart is out of stock",
          });
        }

        // Check if product price matches
        if (product.price !== cart[item].price) {
          return res.status(400).json({
            success: false,
            error: "Price of some item in your cart is changed",
          });
        }
      }

      // Check if cart total matches
      if (totalSum !== req.body.subTotal) {
        return res
          .status(400)
          .json({ success: false, error: "Items are tampered" });
      }

      // Check if there are items in the cart
      if (req.body.subTotal < 1) {
        return res
          .status(400)
          .json({ success: false, error: "No item in cart" });
      }

      // Create an order
      const order = new Order({
        userId: user._id,
        orderId: Math.random() * Date.now(),
        products: req.body.cart,
        address: req.body.address,
        amount: req.body.subTotal,
        pincode: req.body.pincode,
      });

      // Update product quantities in the database
      const updates = Object.keys(cart).map(async (item) => {
        const quantity = -parseInt(cart[item].qty);
        await Product.updateOne(
          { slug: item },
          { $inc: { availableQuantity: quantity } }
        );
      });

      await Promise.all(updates);

      // Save the order
      await order.save();

      return res
        .status(200)
        .json({ success: true, msg: "Successfully ordered" });
    } else {
      return res
        .status(400)
        .json({ success: false, error: "Invalid request method" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export default connectDb(handler);
