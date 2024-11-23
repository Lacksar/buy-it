import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, category }) => {
  return (
    <section className="text-gray-600 body-font min-h-screen">
      <div className="container px-5 py-24 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  mx-auto px-4">
          {Object.keys(products).length === 0 ? (
            <p>Sorry, all the {category} are out of stock</p>
          ) : (
            Object.values(products).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
