import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { ToastContainer } from "react-toastify";

const AddProduct = ({ Toast }) => {
  const [product, setProduct] = useState({
    title: "",
    color: "",
    size: "",
    desc: "",
    image: "",
    category: "",
    actualPrice: 0,
    discount: 0,
    price: 0,
    availableQuantity: 0,
    theme: "",
  });

  useEffect(() => {
    // Recalculate the price whenever discount or actualPrice changes
    const updatedPrice =
      product.actualPrice - (product.actualPrice * product.discount) / 100;
    setProduct((prevProduct) => ({
      ...prevProduct,
      price: updatedPrice,
    }));
  }, [product.actualPrice, product.discount]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Ensure number values are parsed correctly for numeric fields
    const parsedValue =
      name === "actualPrice" ||
      name === "discount" ||
      name === "price" ||
      name === "availableQuantity"
        ? parseFloat(value) || 0 // Default to 0 if parsing fails
        : value;

    setProduct((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };

  const addProduct = async () => {
    // Validate if required fields are filled
    const requiredFields = [
      "title",
      "color",
      "size",
      "image",
      "category",
      "actualPrice",
      "availableQuantity",
    ];

    // Check for missing required fields
    for (let field of requiredFields) {
      if (!product[field]) {
        Toast("error", `Please fill in the ${field} field.`);
        return; // Stop further execution if any required field is empty
      }
    }

    try {
      const response = await fetch("/api/products/addproducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product), // Send only the current product, not the entire array
      });

      const data = await response.json();

      if (response.ok) {
        alert("Product added successfully");
        Toast("success", "Product added successfully");
        console.log(data);
        setProduct({
          title: "",
          color: "",
          size: "",
          desc: "",
          image: "",
          category: "",
          actualPrice: 0,
          discount: 0,
          price: 0,
          availableQuantity: 0,
          theme: "",
        }); // Reset form fields after success
      } else {
        Toast("error", data.message);
      }
    } catch (error) {
      Toast("error", error.message);
    }
  };

  return (
    <Layout>
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
      <div className="w-4/5 ml-auto mr-auto">
        <h1 className="text-3xl">Add Product</h1>

        <div className="grid gap-6 mb-6 md:grid-cols-2 mt-10">
          {Object.keys(product).map((key) => (
            <div key={key}>
              <label
                htmlFor={key}
                className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
              >
                {key === "desc"
                  ? "Description"
                  : key.charAt(0).toUpperCase() + key.slice(1)}
              </label>

              {/* Conditionally render number input for numeric fields */}
              {key === "desc" ? (
                <textarea
                  id={key}
                  name={key}
                  value={product[key]}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Product Description"
                  required
                />
              ) : (
                <input
                  type={
                    key === "actualPrice" ||
                    key === "discount" ||
                    key === "price" ||
                    key === "availableQuantity"
                      ? "number"
                      : "text"
                  }
                  id={key}
                  name={key}
                  value={product[key]}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={`Enter Product ${
                    key.charAt(0).toUpperCase() + key.slice(1)
                  }`}
                  required
                  step="any" // Allow decimal values for number fields
                />
              )}
            </div>
          ))}
        </div>

        <button
          onClick={addProduct} // Call addProduct directly, no need to add to products array
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add Product
        </button>
      </div>
    </Layout>
  );
};

export default AddProduct;
