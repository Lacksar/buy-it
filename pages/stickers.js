import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";
import mongoose from 'mongoose';








function stickers({ stickers }) {





  return (
    <section className="text-gray-600 body-font min-h-screen">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center sm:justify-between ">


          {Object.keys(stickers).length == 0 && <p>Sorry, all the stickers are out of Stock</p>}
          {stickers && Object.keys(stickers).map((x) => {

            return (


              < div className=" sm:w-1/2 lg:w-1/4 md:w-1/2 p-4 w-5/6  xl:w-1/5 shadow-md" key={x}>
                <Link href={`/product/${stickers[x].slug}`}>
                  <div className="block relative rounded overflow-hidden">
                    <img alt="ecommerce" className=" object-top ml-auto mr-auto" loading='lazy' src={stickers[x].image} />
                  </div>

                  <div className="mt-4 ">
                    <h3 className="text-gray-500 text-sm tracking-widest title-font">Sticker</h3>
                    <h2 className="text-gray-900 title-font text-xl font-medium tracking-wide">{stickers[x].title}</h2>
                    <p className="mt-2">${stickers[x].price}</p>

                    <div className="mt-2">

                      {stickers[x].size.map(x => {
                        return <span key={x} className='mr-3 border-2 pl-1 pr-1'>{x}</span>
                      })}

                    </div>

                    <div className="mt-2 flex">

                      {stickers[x].color.map(x => {
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


export default stickers



export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL)
  }

  let products = await Product.find({ category: "sticker" })

  let stickers = {};

  for (let item of products) {

    if (item.availableQuantity < 1) {
      continue;
    }

    if (item.title in stickers) {
      if (!stickers[item.title].color.includes(item.color) && item.availableQuantity) {
        stickers[item.title].color.push(item.color);

      }
      if (!stickers[item.title].size.includes(item.size) && item.availableQuantity) {
        stickers[item.title].size.push(item.size);

      }

    }
    else {
      stickers[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQuantity > 0) {
        stickers[item.title].color = [item.color];
        stickers[item.title].size = [item.size];
      }
    }




  }

  return {
    props: { stickers }
  }


}



