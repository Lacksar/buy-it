import React, { useEffect } from "react";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import Order from "@/models/Order";
import Pagenotfound from "@/components/Pagenotfound";

function myorder(props) {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  });

  const { order } = props;
  const products = order ? order.products[0] : false;
  // console.log(products['buyit-tshirt-red'].itemName)

  return (
    <>
      {order ? (
        <>
          <section className="text-gray-600 body-font overflow-x-auto min-h-screen">
            <div className="container px-5 py-10 mx-auto">
              <div className="lg:w-11/12 mx-auto flex flex-wrap">
                <div className="lg:w-full w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 ">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-900 text-white pl-10 pt-10 rounded-md pb-4">
                    <h2 className="text-sm title-font text-white tracking-widest">
                      Buy-It
                    </h2>
                    <h1 className=" text-xl md:text-2xl title-font md:font-bold mb-2 mt-2">
                      #Order Id: {order.orderId}
                    </h1>
                    <p className="  md:font-semibold mb-5 mt-2 pl-4">
                      Created at:{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-US")}
                    </p>
                  </div>
                  {/* start here------------------------------------------------------------------ */}

                  <div class="relative overflow-x-auto shadow-sm shadow-gray-400 sm:rounded-sm mb-20 mt-20">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" class="px-6 py-3">
                            Product name
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Variant/Size
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Quantity
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Per Price
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Total
                          </th>
                          <th scope="col" class="px-6 py-3">
                            View product
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(products).map((x, y) => {
                          return (
                            <tr
                              key={y}
                              class="bg-white border-b h-20 dark:bg-gray-800 dark:border-gray-700"
                            >
                              <th
                                scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {products[x].itemName}
                              </th>
                              <td class="px-6 py-4 text-black">
                                ({products[x].variant}/{products[x].size})
                              </td>
                              <td class="px-6 py-4 text-black">
                                {products[x].qty}
                              </td>
                              <td class="px-6 py-4 text-black">
                                Rs. {products[x].price}
                              </td>
                              <td class="px-6 py-4 text-black">
                                {" "}
                                Rs. {products[x].price * products[x].qty}
                              </td>
                              <td
                                class="px-6  py-4 underline text-blue-400 cursor-pointer"
                                onClick={() => router.push(`/product/${x}`)}
                              >
                                View product
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* ends here -------------------------------------------- */}

                  <div className="flex mt-10 border-t-2 pt-5">
                    <button className="flex text-white bg-indigo-500 border-0 px-2 py-2 md:px-6 focus:outline-none hover:bg-indigo-600 rounded">
                      Track Order
                    </button>
                    <span className="title-font font-medium text-xl md:text-2xl sm:text-xl ml-auto text-gray-900">
                      SubTotal: Rs. {order.amount}
                    </span>
                  </div>
                </div>
                {/* <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" /> */}
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <Pagenotfound />
        </>
      )}
    </>
  );
}

export default myorder;

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL);
  }

  if (!mongoose.Types.ObjectId.isValid(context.query.id)) {
    return { props: { order: false } };
  }

  let order = await Order.findById(context.query.id);
  return { props: { order: JSON.parse(JSON.stringify(order)) } };
}
