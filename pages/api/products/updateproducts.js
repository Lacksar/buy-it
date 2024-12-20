import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    for (let i = 0; i < req.body.length; i++) {
      let p = await Product.findByIdAndUpdate(req.body[i]._id, req.body[i]);
    }
    res.status(200).send({ success: "product updated sucessfully" });
  } else {
    req.status(400).json({ error: "Internal Server Error " });
  }
};

export default connectDb(handler);
//
