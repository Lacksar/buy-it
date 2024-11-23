import React from "react";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div
      style={{ boxShadow: "0px 2px 3px #d3d3d3" }}
      className="   w-full sm:w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 duration-300 "
    >
      <Link href={`/product/${product.slug}`}>
        {/* <h2 className="ml-4 text-md font-thin  dark:text-white text-gray-900">
          {product.category.toUpperCase()}
        </h2> */}
        <img
          className="h-80 w-full object-cover object-center "
          src={product.image}
          alt="Product Image"
        />

        <div className=" pb-5 pl-4 rounded-b-md bg-gray-50">
          <div className="p-4">
            <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
              {product.title.toUpperCase()}
            </h2>

            <div className="flex items-center">
              <p className="mr-2  text-2xl font-mono text-gray-900 dark:text-white">
                Rs.{product.price}
              </p>
              {product.actualPrice !== product.price && product.actualPrice && (
                <p className="text-base font-medium text-gray-500 line-through dark:text-gray-300">
                  Rs.{product.actualPrice}
                </p>
              )}
              {product.discount && (
                <p className="ml-auto text-base font-medium text-green-500">
                  {product.discount}% off
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
