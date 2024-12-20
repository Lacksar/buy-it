import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/Rx";
import { MdAccountCircle } from "react-icons/Md";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import SearchBox from "./Searchbox";

function Navbar(props) {
  const router = useRouter();
  const isAdminRoute = router.pathname.split("/").includes("admin");
  const {
    cart,
    addToCart,
    removeFromCart,
    subTotal,
    clearCart,
    user,
    logout,
    cartIsOpen,
    Toast,
    categories,
  } = props;

  console.log("navbar " + categories);

  const [token, setToken] = useState();
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const ref = useRef();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  });

  const [show, setShow] = useState(false);
  const [showCatagory, setShowCatagory] = useState(false);

  const toggle = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const toggleCatagory = () => {
    if (showCatagory) {
      setShowCatagory(false);
    } else {
      setShowCatagory(true);
    }
  };

  return (
    <>
      {!isAdminRoute && (
        <div className="text-gray-600 bg-gray-100 body-font py-2 fixed w-full top-0 border-b-2 z-50">
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
          <div className="container gap-x-5 mx-auto flex flex-col md:flex-row   p-0 md:p-5 items-center justify-between">
            <div style={{ flex: "0.5" }} className="flex   items-center">
              <Link
                href={"/"}
                className="flex title-font font-medium items-center text-gray-900 md:mb-0"
              >
                <Image src="/logo.png" width={30} height={30} alt="logo" />
                <span className="ml-3 text-xl whitespace-nowrap">Buy-It</span>
              </Link>

              <AiOutlineMenu
                className="md:hidden text-2xl absolute top-2 right-5 hover:text-blue-600 cursor-pointer"
                onClick={toggleCatagory}
              />
            </div>

            <div className=" flex-1  flex justify-center">
              <SearchBox category={categories} />
            </div>

            <div style={{ flex: 2 }} className="  ">
              <div
                className={`md:ml-auto md:mr-20 flex-wrap mt-2 md:mt:0 items-center text-base justify-center ${
                  showCatagory ? "flex " : "hidden"
                } md:flex flex-row`}
              >
                <Link
                  href={"/"}
                  className="mr-2 md:mr-5 hover:bg-blue-500 hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-700 hover:text-white p-2 rounded-md transition-transform"
                >
                  Home
                </Link>

                {Array.isArray(categories) &&
                  categories.length > 0 &&
                  categories.slice(0, 4).map((x, index) => (
                    <Link
                      key={index} // Add a unique key for each element
                      href={`/products/${x}`}
                      className="mr-2 md:mr-5 hover:bg-blue-500 hover:text-white p-2 rounded-md transition-transform hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-700"
                    >
                      {x.charAt(0).toUpperCase() + x.slice(1)}
                    </Link>
                  ))}
              </div>
            </div>

            <div className="md:flex justify-end hidden ">
              <div className="flex gap-3 justify-end items-center">
                <AiOutlineShoppingCart
                  className="text-3xl cursor-pointer hover:scale-150 transition-transform"
                  onClick={toggleCart}
                />

                <div className="relative">
                  {token && (
                    <>
                      <MdAccountCircle
                        className="text-3xl cursor-pointer hover:scale-150 transition-transform"
                        onMouseEnter={toggle}
                        onMouseLeave={toggle}
                      />

                      <div
                        onMouseEnter={() => setShow(true)}
                        onMouseLeave={() => setShow(false)}
                        className={`${
                          !show ? "hidden" : ""
                        } flex flex-col w-32 pl-5 pr-5 pt-2 pb-2 absolute left-0 top-full bg-white shadow-lg rounded-md text-black`}
                      >
                        <Link
                          href={"/myprofile"}
                          className="w-full mb-2 hover:text-gray-600 mt-4"
                        >
                          My Profile
                        </Link>
                        <Link
                          href={"/orders"}
                          className="w-full mb-2 hover:text-gray-600"
                        >
                          Orders
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            Toast("success", "Successfully Logged Out");
                          }}
                          className="text-left w-full mb-2 hover:text-gray-600"
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  )}

                  {!token && (
                    <Link
                      href={"/login"}
                      className="flex text-white bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 rounded items-center gap-2 ml-4"
                    >
                      Login?
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* sidebar */}
          <div
            ref={ref}
            className={`w-full sideber absolute top-0 right-0 bg-gray-800 text-white p-10 rounded-md transition-transform ${
              !cartIsOpen ? "translate-x-full" : "translate-x-0"
            } transform md:w-2/5 min-h-screen`}
          >
            <div>
              <h1 className="block absolute top-5 left-10 text-2xl">
                Shopping Cart
              </h1>
              <span
                className="absolute top-5 right-5 p-2 rounded-full cursor-pointer hover:bg-slate-200 hover:text-black"
                onClick={toggleCart}
              >
                <RxCross1 />
              </span>
            </div>

            <div className="h-screen mt-10 overflow-y-scroll">
              <ol>
                {Object.keys(cart).length === 0 && (
                  <div>No item in the cart!</div>
                )}

                {Object.keys(cart).length !== 0 &&
                  Object.keys(cart).map((k) => (
                    <li
                      className="mb-2 flex items-center justify-start flex-wrap"
                      key={k}
                    >
                      <img
                        alt="ecommerce"
                        className="h-20 mr-2 "
                        src="https://lesdeux.co.uk/cdn/shop/products/Crew_Hoodie-Hoodie-LDM202010-460460-Dark_Navy_600x.jpg?v=1681807282"
                      />
                      <div className="flex flex-col sm:flex-row">
                        <p className="mr-2">
                          {cart[k].itemName +
                            `(${cart[k].size}/${cart[k].variant})`}
                        </p>
                        <div className="mt-3 sm:mt-0">
                          <button
                            className="bg-blue-700 w-7 h-7 rounded-full"
                            onClick={() => {
                              removeFromCart(
                                k,
                                cart[k].price,
                                cart[k].itemName,
                                cart[k].size,
                                cart[k].variant
                              );
                            }}
                          >
                            -
                          </button>
                          <span className="ml-2 mr-2">{cart[k].qty}</span>
                          <button
                            className="bg-blue-700 w-7 h-7 rounded-full"
                            onClick={() => {
                              addToCart(
                                k,
                                cart[k].price,
                                cart[k].itemName,
                                cart[k].size,
                                cart[k].variant
                              );
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
              </ol>

              <h1 className="mt-5 font-bold text-md ">
                SubTotal: रु{subTotal}
              </h1>
              <div className="flex gap-2 mt-9 mb-20 flex-wrap">
                <Link onClick={toggleCart} href={"/checkout"}>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-40 disabled:bg-blue-200 disabled:cursor-not-allowed disabled:text-black"
                    disabled={Object.keys(cart).length === 0}
                  >
                    Checkout
                  </button>
                </Link>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-40 disabled:bg-blue-200 disabled:cursor-not-allowed disabled:text-black"
                  onClick={() => {
                    clearCart();
                    Toast("success", "Cart Cleared!");
                  }}
                  disabled={Object.keys(cart).length === 0}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
