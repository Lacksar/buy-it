import connectDb from "@/middleware/mongoose";
import { RiCreativeCommonsZeroLine } from "react-icons/ri";
import Order from "@/models/Order";

const handler = async (req, res) => {
  if (req.method == "POST") {
    console.log(req.body);
    let order = await Order.findById(req.body);
    console.log(order);

    if (order) {
      if (order.status == "delivered") {
        res.status(400).json({ success: false, message: "Already delivered" });
      }
      console.log("order found");
      let p = await Order.findOneAndUpdate(
        { _id: req.body },
        { status: "delivered" },
        { new: true }
      );
      res
        .status(200)
        .json({ success: true, message: "Successfully delivered" });
    } else {
      res.status(400).json({ success: false, message: "order not found" });
    }
  } else {
    res.status(400).json({ success: false, error: "Internal Server Error " });
  }
};

export default connectDb(handler);
//
