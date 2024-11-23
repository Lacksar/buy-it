import React from "react";
import { useRouter } from "next/router";

function TableComponent({ columns, products }) {
  const router = useRouter();

  return (
    <div className="relative overflow-x-auto shadow-md shadow-gray-700 sm:rounded-lg mb-20 mt-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((col, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(products).map((key, index) => {
            const product = products[key];
            return (
              <tr
                key={index}
                className="bg-white border-b h-20 dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product.itemName}
                </th>
                <td className="px-6 py-4 text-black">
                  ({product.variant}/{product.size})
                </td>
                <td className="px-6 py-4 text-black">{product.qty}</td>
                <td className="px-6 py-4 text-black">Rs. {product.price}</td>
                <td className="px-6 py-4 text-black">
                  Rs. {product.price * product.qty}
                </td>
                <td
                  className="px-6 py-4 underline text-blue-400 cursor-pointer"
                  onClick={() => router.push(`/product/${key}`)}
                >
                  View product
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableComponent;
