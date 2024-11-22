import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/Rx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function checkout(props) {
  const { cart, addToCart, removeFromCart, subTotal, clearCart, user, Toast } =
    props;
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [pincode, setPincode] = useState("");
  const [disabled, setDisabled] = useState(true);
  let dis =
    name.length == 0 ||
    email.length == 0 ||
    address.length == 0 ||
    phone.length < 10 ||
    city.length == 0 ||
    province.length == 0 ||
    pincode.length == 0 ||
    phone.length > 10;

  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
      if (e.target.value.length == 5) {
        let pinJson = await fetch("/api/pincode");
        let pins = await pinJson.json();
        if (Object.keys(pins).includes(e.target.value)) {
          setCity(pins[e.target.value][0]);
          setProvince(pins[e.target.value][1]);
        } else {
          setCity("");
          setProvince("");
        }
      } else {
        setCity("");
        setProvince("");
      }
    } else {
    }
  };

  const orderNow = async (e) => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    }

    e.preventDefault();

    let data = {
      cart,
      email,
      address,
      phone,
      city,
      pincode,
      user,
      token: localStorage.getItem("token"),
      subTotal,
    };
    let res = await fetch("/api/products/order", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    let response = await res.json();

    if (response.success) {
      Toast("success", response.msg);

      clearCart();
    } else if (!res.success) {
      Toast("error", response.error);
    }
  };

  return (
    <>
      <div className=" ml-auto mr-auto w-5/6 mt-10 mb-20">
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
        <h1 className="text-2xl text-center font-semibold text-gray-900 mb-5">
          Checkout
        </h1>

        {/* Delivery Details */}

        <div className="mt-10">
          <h2 className="text-md text-xl  mt-4 font-semibold mb-3">
            1. Delivery Details
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 ">
              <label>Name</label>
              <input
                onChange={handleChange}
                value={name}
                name="name"
                className="pl-2 h-10 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input
                onChange={handleChange}
                value={email}
                name="email"
                type="email"
                className="pl-2 h-10 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              />
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <label>Address</label>
              <textarea
                onChange={handleChange}
                value={address}
                name="address"
                className="pt-2 pl-2 h-16 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              ></textarea>
            </div>

            <div className="flex flex-col gap-2">
              <label>Phone</label>
              <input
                onChange={handleChange}
                value={phone}
                name="phone"
                type="number"
                className="pl-2 h-10 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>Pincode</label>
              <input
                onChange={handleChange}
                value={pincode}
                name="pincode"
                type="number"
                className="pl-2 h-10 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>Province</label>
              <input
                readOnly
                onChange={handleChange}
                value={province}
                name="province"
                className="pl-2 h-10 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>City</label>
              <input
                readOnly
                onChange={handleChange}
                value={city}
                name="city"
                className="pl-2 h-10 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Review Items  */}

        <div>
          <h2 className="text-md text-xl  mt-4 font-semibold mb-3">
            1. Review Items
          </h2>
          <div className=" w-full sideber bg-gray-100 border-2 border-black text-black  p-10 rounded-md">
            <div className=" mt-5 overflow-y-scroll">
              <ol>
                {Object.keys(cart).length == 0 && (
                  <div>No item in the cart!</div>
                )}

                {!Object.keys(cart).length == 0 &&
                  Object.keys(cart).map((k) => {
                    return (
                      <li
                        className="flex items-center justify-start flex-wrap"
                        key={k}
                      >
                        <img
                          alt="ecommerce"
                          className="h-20 mr-2 "
                          src="https://lesdeux.co.uk/cdn/shop/products/Crew_Hoodie-Hoodie-LDM202010-460460-Dark_Navy_600x.jpg?v=1681807282"
                        />
                        <div className="flex flex-col sm:flex-row ">
                          <p className="mr-2">
                            {cart[k].itemName +
                              ` (${cart[k].size}/${cart[k].variant})`}
                          </p>
                          <div>
                            <button
                              className=" bg-blue-700 w-7 h-7 rounded-full"
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
                    );
                  })}
              </ol>

              <h1 className="mt-5 font-bold text-md">SubTotal: रु{subTotal}</h1>
            </div>
          </div>

          <button
            disabled={Object.keys(cart).length == 0 || dis}
            className={`bg-blue-500 hover:bg-blue-600  cursor-pointer mt-4 disabled:bg-blue-100 disabled:cursor-not-allowed   py-2 px-4 rounded w-40`}
            onClick={orderNow}
          >
            Order now
          </button>
        </div>
      </div>
    </>
  );
}

export default checkout;
