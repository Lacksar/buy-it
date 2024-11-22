import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";
import mongoose from "mongoose";

function hoodies({ hoodies }) {
  return (
    <section className="text-gray-600 body-font min-h-screen">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center sm:justify-around">
          {Object.keys(hoodies).length == 0 && (
            <p>Sorry, all the hoodies are out of Stock</p>
          )}
          {hoodies &&
            Object.keys(hoodies).map((x) => {
              return (
                <div
                  className=" mb-4 sm:w-1/2 lg:w-1/4 md:w-1/2 p-4 w-5/6  xl:w-1/5 shadow-md"
                  key={x}
                >
                  <Link href={`/product/${hoodies[x].slug}`}>
                    <div className="block relative rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className=" object-top ml-auto mr-auto"
                        loading="lazy"
                        src={hoodies[x].image}
                      />
                    </div>
                    <div className="mt-4 ">
                      <h3 className="text-gray-500 text-sm tracking-widest title-font">
                        Hoodie
                      </h3>
                      <h2 className="text-gray-900 title-font text-xl font-medium tracking-wide">
                        {hoodies[x].title}
                      </h2>
                      <p className="mt-2">${hoodies[x].price}</p>

                      <div className="mt-2">
                        {hoodies[x].size.map((x) => {
                          return (
                            <span key={x} className="mr-3 border-2 pl-1 pr-1">
                              {x}
                            </span>
                          );
                        })}
                      </div>

                      <div className="mt-2 flex">
                        {hoodies[x].color.map((x) => {
                          return (
                            <div
                              className="mr-2 border-2 rounded-full p-1 w-5 h-5"
                              style={{ backgroundColor: `${x}` }}
                              key={x}
                            ></div>
                          );
                        })}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default hoodies;

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL);
  }

  let products = await Product.find({ category: "hoodie" });

  let hoodies = {};

  for (let item of products) {
    if (item.availableQuantity < 1) {
      continue;
    }

    if (item.title in hoodies) {
      if (
        !hoodies[item.title].color.includes(item.color) &&
        item.availableQuantity
      ) {
        hoodies[item.title].color.push(item.color);
      }
      if (
        !hoodies[item.title].size.includes(item.size) &&
        item.availableQuantity
      ) {
        hoodies[item.title].size.push(item.size);
      }
    } else {
      hoodies[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQuantity > 0) {
        hoodies[item.title].color = [item.color];
        hoodies[item.title].size = [item.size];
      }
    }
  }

  return {
    props: { hoodies },
  };
}
