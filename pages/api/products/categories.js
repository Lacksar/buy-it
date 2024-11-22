import connectDb from "@/middleware/mongoose";
import Product from "@/models/Product";

const getCategories = async (req, res) => {
  if (req.method === "GET") {
    try {
      const products = await Product.find();

      // Extract unique categories
      const categories = [
        ...new Set(products.map((product) => product.category)),
      ];

      res.status(200).json({
        success: true,
        categories,
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid request method",
    });
  }
};

export default connectDb(getCategories);
