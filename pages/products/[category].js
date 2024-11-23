import ProductList from "@/components/ProductList";
import connectDb from "@/middleware/mongoose";
import mongoose from "mongoose";
import Product from "@/models/Product";

const CategoryPage = ({ products, category }) => {
  console.log(products);
  return <ProductList products={products} category={category} />;
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL);
  }

  let produc = await Product.find({ category: context.params.category });

  let products = {};

  for (let item of produc) {
    if (item.availableQuantity < 1) {
      continue;
    }

    if (item.title in products) {
      if (
        !products[item.title].color.includes(item.color) &&
        item.availableQuantity
      ) {
        products[item.title].color.push(item.color);
      }
      if (
        !products[item.title].size.includes(item.size) &&
        item.availableQuantity
      ) {
        products[item.title].size.push(item.size);
      }
    } else {
      products[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQuantity > 0) {
        products[item.title].color = [item.color];
        products[item.title].size = [item.size];
      }
    }

    // Add the calculated final price to the product object
    products[item.title].price = item.price;
    products[item.title].actualPrice = item.actualPrice || null;
    products[item.title].discount = item.discount || null;
  }

  return {
    props: { products, category: context.params.category },
  };
}

export default CategoryPage;
