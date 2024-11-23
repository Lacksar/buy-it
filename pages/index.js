import CategoriesList from "@/components/CategoriesList";
import CategoryCard from "@/components/CategoryCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import React from "react";

function index() {
  fetch;

  return (
    <>
      <Head>
        <title>Buy-It</title>
        <link rel="icon" href="logo.png" type="image/x-icon" />
      </Head>

      <div className="overflow-hidden flex justify-center ">
        <img src="/home.jpg" alt="Hoodie" className="h-full " />
      </div>

      <CategoriesList />
    </>
  );
}

export default index;
