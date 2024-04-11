import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";
import mongoose from 'mongoose';








function tshirts({ tshirts }) {





  return (
    <section className="text-gray-600 body-font min-h-screen">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center sm:justify-around">


          {Object.keys(tshirts).length == 0 && <p>Sorry, all the tshirts are out of Stock</p>}
          {tshirts && Object.keys(tshirts).map((x) => {

            return (


              < div className=" mb-4 sm:w-1/2 lg:w-1/4 md:w-1/2 p-4 w-5/6  xl:w-1/5 shadow-md" key={x}>
                <Link href={`/product/${tshirts[x].slug}`}>
                  <div className="block relative rounded overflow-hidden">
                    <img alt="ecommerce" className=" object-top ml-auto mr-auto" loading='lazy' src={tshirts[x].image} />
                  </div>
                  <div className="mt-4 ">
                    <h3 className="text-gray-500 text-sm tracking-widest title-font">Hoodie</h3>
                    <h2 className="text-gray-900 title-font text-xl font-medium tracking-wide">{tshirts[x].title}</h2>
                    <p className="mt-2">${tshirts[x].price}</p>

                    <div className="mt-2 flex flex-wrap gap-2">

                      {tshirts[x].size.map(x => {
                        return <span key={x} className=' border-2 pl-1 pr-1'>{x}</span>
                      })}

                    </div>

                    <div className="mt-2 flex">

                      {tshirts[x].color.map(x => {
                        return <div className='mr-2 border-2 rounded-full p-1 w-5 h-5' style={{ backgroundColor: `${x}` }} key={x}></div>
                      })}

                    </div>

                  </div>
                </Link>
              </div>

            )
          })
          }



        </div>
      </div>
    </section >
  )
}


export default tshirts



export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL)
  }

  let products = await Product.find({ category: "tshirt" })

  let tshirts = {};

  for (let item of products) {

    if (item.availableQuantity < 1) {
      continue;
    }

    if (item.title in tshirts) {
      if (!tshirts[item.title].color.includes(item.color) && item.availableQuantity) {
        tshirts[item.title].color.push(item.color);

      }
      if (!tshirts[item.title].size.includes(item.size) && item.availableQuantity) {
        tshirts[item.title].size.push(item.size);

      }

    }
    else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQuantity > 0) {
        tshirts[item.title].color = [item.color];
        tshirts[item.title].size = [item.size];
      }


    }




  }

  return {
    props: { tshirts }
  }


}



