import React, { useState } from "react";
import CategoryCard from "./CategoryCard";

const CategoriesList = () => {
  const [images, setImages] = useState([
    "caps",
    "hoodie",
    "oversizedtshirt",
    "polotshirts",
    "sweatshirt",
    "tshirt",
  ]);

  return (
    <div className="mt-10">
      <h1 className="text-center text-2xl md:text-4xl font-semibold ">
        COLLECTIONS
      </h1>
      <div className="gap-10 ml-auto mr-auto mt-10 mb-20 grid grid-cols-2 md:grid-cols-3 w-11/12">
        {images.map((x, y) => {
          return <CategoryCard image={x} key={y} />;
        })}
      </div>
    </div>
  );
};

export default CategoriesList;
