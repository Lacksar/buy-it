import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Orders = (props) => {
  const router = useRouter();
  const [myOrders, setMyOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // For controlling modal visibility

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    } else {
      async function fetchOrders() {
        let token = localStorage.getItem("token");
        let requestBody = JSON.stringify({ token: token });

        let res = await fetch("/api/products/myorders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody,
        });
        let response = await res.json();
        const sortedOrders = response.foundData
          ? response.foundData.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )
          : [];
        setMyOrders(sortedOrders);
        setFilteredOrders(sortedOrders); // Initially, set filtered orders to all orders
      }

      fetchOrders();
    }
  }, [router]);

  // Filter orders based on the date range and price
  const handleFilter = () => {
    let filtered = myOrders;

    // Filter by date range
    if (startDate) {
      filtered = filtered.filter(
        (order) => new Date(order.createdAt) >= new Date(startDate)
      );
    }
    if (endDate) {
      filtered = filtered.filter(
        (order) => new Date(order.createdAt) <= new Date(endDate)
      );
    }

    // Filter by price range
    if (minPrice) {
      filtered = filtered.filter((order) => order.amount >= minPrice);
    }
    if (maxPrice) {
      filtered = filtered.filter((order) => order.amount <= maxPrice);
    }

    setFilteredOrders(filtered);
    setIsModalOpen(false); // Close the modal after applying the filter
  };

  return (
    <div className="overflow-x ml-auto mr-auto mb-10 min-h-screen mt-10 w-11/12 md:w-5/6">
      <h1 className="text-4xl font-semibold mb-5 mt-5 text-center bg-gradient-to-r from-blue-500 to-blue-900 text-white p-5 rounded-lg shadow-lg">
        My Orders
      </h1>

      {/* Filter Button to Open Modal */}
      <div className="text-center mb-5 flex justify-end ">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-900 rounded-md shadow-sm shadow-gray-700"
        >
          Filter Orders
        </button>
      </div>

      {/* Modal for Filters */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <h2 className="text-xl font-bold mb-4">Filter Orders</h2>

            {/* Date Range Filter */}
            <div className="flex flex-col mb-4">
              <label className="mb-2">Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border p-2 rounded-md"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2">End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border p-2 rounded-md"
              />
            </div>

            {/* Price Range Filter */}
            <div className="flex flex-col mb-4">
              <label className="mb-2">Min Price:</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="border p-2 rounded-md"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2">Max Price:</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="border p-2 rounded-md"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)} // Close the modal
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleFilter} // Apply filter
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative overflow-x-auto shadow-lg shadow-gray-400 sm:rounded-lg mb-20 mt-20">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3">
                SubTotal
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => {
                return (
                  <tr
                    onClick={() => router.push(`/order?id=${order._id}`)}
                    key={order._id}
                    className="bg-white border-b h-20 dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                  >
                    <th className="px-6 py-4 text-black">{order.orderId}</th>
                    <td className="px-6 py-4 text-black">रु{order.amount}</td>
                    <td className="px-6 py-4 text-black">
                      {new Date(order.createdAt).toLocaleDateString("en-US")}
                    </td>
                    <td className="px-6 py-4 text-black">{order.address}</td>
                    <td className="px-6 py-4 text-black">{order.status}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
