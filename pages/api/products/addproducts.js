import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const productData = req.body;

      const slug = `${productData.title}-${productData.color}-${productData.size}`;

      // Check if product with the same slug already exists
      const existingProduct = await Product.findOne({ slug });
      if (existingProduct) {
        return res
          .status(400)
          .json({ success: false, message: "Duplicate product found" });
      }

      // Proceed with creating the new product if no duplicate is found
      let product = new Product({
        title: productData.title,
        slug,
        desc: productData.desc || null,
        image: productData.image,
        category: productData.category,
        size: productData.size,
        color: productData.color,
        price: productData.price,
        availableQuantity: productData.availableQuantity,
        discount: productData.discount || null,
        actualPrice: productData.actualPrice || null,
        theme: productData.theme || null,
      });

      await product.save();

      res
        .status(200)
        .json({ success: true, message: "Product added successfully" });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else {
    res.status(400).json({ success: false, message: "Invalid request method" });
  }
};

export default connectDb(handler);
