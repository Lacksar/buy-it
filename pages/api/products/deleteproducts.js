import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    for (let i = 0; i < req.body.length; i++) {
      let p = await Product.findByIdAndDelete(req.body[i]._id);
    }
    res.status(200).send({ success: "product deleted sucessfully" });
  } else {
    res.status(400).json({ error: "Internal Server Error " });
  }
};

export default connectDb(handler);
//
