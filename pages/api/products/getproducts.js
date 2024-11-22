import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  try {
    // Connect to the database

    // Find all products
    let products = await Product.find();

    // Object to store t-shirts grouped by title
    let tshirts = {};

    for (let item of products) {
      if (item.title in tshirts) {
        if (!tshirts[item.title].color) {
          tshirts[item.title].color = [];
        }
        if (!tshirts[item.title].size) {
          tshirts[item.title].size = [];
        }
        if (
          !tshirts[item.title].color.includes(item.color) &&
          item.availableQuantity
        ) {
          tshirts[item.title].color.push(item.color);
        }
        if (
          !tshirts[item.title].size.includes(item.size) &&
          item.availableQuantity
        ) {
          tshirts[item.title].size.push(item.size);
        }
      } else {
        tshirts[item.title] = {
          ...JSON.parse(JSON.stringify(item)),
          color: [],
          size: [],
        };
        if (item.availableQuantity > 0) {
          tshirts[item.title].color.push(item.color);
          tshirts[item.title].size.push(item.size);
        }
      }
    }

    // Send the response with t-shirts data
    res.status(200).json({ tshirts });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default connectDb(handler);
//
