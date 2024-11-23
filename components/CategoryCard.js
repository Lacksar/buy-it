import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryCard = ({ image }) => {
  return (
    <Link href={`/${image}`}>
      <img
        className="w-full hover:scale-105 transition-transform cursor-pointer"
        src={`/category/${image}.webp`}
      />
    </Link>
  );
};

export default CategoryCard;
