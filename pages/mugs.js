import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";
import mongoose from 'mongoose';








function mugs({ mugs }) {





  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center sm:justify-between ">


          {Object.keys(mugs).length == 0 && <p>Sorry, all the mugs are out of Stock</p>}
          {mugs && Object.keys(mugs).map((x) => {

            return (


              < div className=" sm:w-1/2 lg:w-1/4 md:w-1/2 p-4 w-5/6  xl:w-1/5 shadow-md" key={x}>
                <Link href={`/product/${mugs[x].slug}`}>
                  <div className="block relative rounded overflow-hidden">
                    <img alt="ecommerce" className=" object-top ml-auto mr-auto" src={mugs[x].image} />
                  </div>
                  <div className="mt-4 ">
                    <h3 className="text-gray-500 text-sm tracking-widest title-font">Mug</h3>
                    <h2 className="text-gray-900 title-font text-xl font-medium tracking-wide">{mugs[x].title}</h2>
                    <p className="mt-2">${mugs[x].price}</p>

                    <div className="mt-2">

                      {mugs[x].size.map(x => {
                        return <span key={x} className='mr-3 border-2 pl-1 pr-1'>{x}</span>
                      })}

                    </div>

                    <div className="mt-2 flex">

                      {mugs[x].color.map(x => {
                        return <div className='mr-2 border-2 rounded-full p-1 w-5 h-5' style={{ backgroundColor: `${x}` }}></div>
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


export default mugs



export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL)
  }

  let products = await Product.find({ category: "mug" })

  let mugs = {};

  for (let item of products) {

    if (item.title in mugs) {
      if (!mugs[item.title].color.includes(item.color) && item.availableQuantity) {
        mugs[item.title].color.push(item.color);

      }
      if (!mugs[item.title].size.includes(item.size) && item.availableQuantity) {
        mugs[item.title].size.push(item.size);

      }

    }
    else {
      mugs[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQuantity > 0) {
        mugs[item.title].color = [item.color];
        mugs[item.title].size = [item.size];
      }
    }




  }

  return {
    props: { mugs }
  }


}



