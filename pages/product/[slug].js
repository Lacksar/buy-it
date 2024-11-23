import { useRouter } from "next/router";
import { AiOutlineShoppingCart } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import mongoose from "mongoose";
import Product from "@/models/Product";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Slug(props) {
  const { addToCart, product, variants, buyNow, Toast } = props;

  const router = useRouter();
  const [pin, setPin] = useState();
  const [service, setService] = useState();
  const [color, setColor] = useState(product.color);
  const [size, setSize] = useState(product.size);
  const {
    query: { slug },
  } = router;

  useEffect(() => {
    setColor(product.color);
    setSize(product.size);
  }, [router.query]);

  const checkPins = async (pin) => {
    let pinJson = await fetch("/api/pincode");
    let pins = await pinJson.json();

    if (Object.keys(pins).includes(pin)) {
      setService(true);
      Toast("success", "Service Available");
    } else {
      setService(false);
      Toast("error", "Service Not Available");
    }
  };

  const refreshPage = (slug) => {
    let host = process.env.HOST;
    let url = `/product/${slug}`;
    router.push(url);
  };

  const handleSizeChange = (e) => {
    const newSize = e.target.value;
    if (variants[color] && variants[color][newSize]) {
      setSize(newSize);
      refreshPage(variants[color][newSize].slug);
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
        />

        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-1/2 ml-auto mr-auto lg:h-auto object-cover object-center rounded"
              src={product.image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="mb-4 text-lg uppercase title-font text-gray-500 tracking-widest">
                {product.category}
              </h2>
              <h1 className="text-gray-900  text-2xl md:text-3xl tracking-wide  title-font font-medium mb-2">
                {product.title.toUpperCase()} ({product.color}/{product.size})
              </h1>

              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>

                  {Object.keys(variants).map((x) => {
                    return (
                      <button
                        key={x}
                        onClick={() => {
                          setColor(x); // Update color when selected
                          refreshPage(
                            variants[x][Object.keys(variants[x])[0]].slug
                          );
                        }}
                        className={`border-2 ${
                          color === x ? "border-black" : "border-gray-300"
                        } rounded-full w-6 h-6 focus:outline-none`}
                        style={{ backgroundColor: `${x}` }}
                      ></button>
                    );
                  })}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      value={size}
                      onChange={handleSizeChange} // Handle size change safely
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 pr-10"
                    >
                      {variants[color] &&
                        Object.keys(variants[color]).map((x) => {
                          return (
                            <option value={x} key={x}>
                              {x}
                            </option>
                          );
                        })}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex gap-3 flex-wrap">
                  <span className="title-font font-medium text-xl sm:text-2xl text-gray-900 mr-4">
                    रु{product.price}
                  </span>
                  <div className="flex gap-3 flex-wrap">
                    <button
                      className="flex  text-white bg-blue-500 bg-gradient-to-r from-blue-500 to-blue-900 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded items-center gap-2"
                      onClick={() => {
                        buyNow(slug, product.price, product.title, size, color),
                          router.push("/checkout");
                      }}
                    >
                      Buy Now
                    </button>
                    <button
                      className="flex  text-white bg-blue-500 bg-gradient-to-r from-blue-500 to-blue-900 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded items-center gap-2"
                      onClick={() => {
                        addToCart(
                          slug,
                          product.price,
                          product.title,
                          size,
                          color
                        ),
                          Toast("success", "Added to cart");
                      }}
                    >
                      <AiOutlineShoppingCart className="text-2xl" />
                      Add To Cart
                    </button>
                  </div>
                </div>
                <div className="flex justify-start gap-3">
                  <input
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        checkPins(pin);
                      }
                    }}
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value);
                    }}
                    type="number"
                    id="first_name"
                    className="w-56 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="111111"
                    required
                  />
                  <button
                    className="flex  text-white bg-blue-500 bg-gradient-to-r from-blue-500 to-blue-900 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded items-center gap-2"
                    onClick={() => checkPins(pin)}
                  >
                    Check
                  </button>
                </div>
              </div>
              {!service && service != null && (
                <p className="text-red-700">Service not Available</p>
              )}

              {service && service != null && (
                <p className="text-green-700">Service Available</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Slug;

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL);
  }

  let product = await Product.findOne({ slug: context.query.slug });
  if (!product) {
    return {
      notFound: true,
    };
  }
  let variants = await Product.find({ title: product.title });

  let colorSizeSlug = {};

  for (let item of variants) {
    if (item.availableQuantity > 0) {
      if (Object.keys(colorSizeSlug).includes(item.color)) {
        colorSizeSlug[item.color][item.size] = { slug: item.slug };
      } else {
        colorSizeSlug[item.color] = {};
        colorSizeSlug[item.color][item.size] = { slug: item.slug };
      }
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    },
  };
}
