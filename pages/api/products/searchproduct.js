import connectDb from "@/middleware/mongoose";
import Product from "@/models/Product";

async function handler(req, res) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }

  const { query } = req.query;

  if (!query) {
    return res
      .status(400)
      .json({ success: false, message: "Query parameter is required" });
  }

  try {
    console.log("Received query:", query);

    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { slug: { $regex: query, $options: "i" } },
      ],
    });

    console.log("Fetched products:", products);

    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export default connectDb(handler);
