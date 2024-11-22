import React from 'react'
import Layout from './Layout'
import Product from "@/models/Product";
import mongoose from 'mongoose';
import Link from 'next/link'
import { useRouter } from 'next/router';




const products = (props) => {

    const { items } = props;
    const { router } = useRouter();



    return (
        <Layout>

            <div className='flex shadow-lg mx-20 h-10 rounded-md items-center justify-around'>
                <Link href={"/admin/products?type=tshirt"} className='text-md hover:scale-x-110 transition-all hover:text-blue-400'>Tshirts</Link>
                <Link href={"/admin/products?type=hoodie"} className='text-md hover:scale-x-110 transition-all hover:text-blue-400'>Hoodies</Link>
                <Link href={"/admin/products?type=mug"} className='text-md hover:scale-x-110 transition-all hover:text-blue-400'>Mugs</Link>
                <Link href={"/admin/products?type=sticker"} className='text-md hover:scale-x-110 transition-all hover:text-blue-400'>Stickers</Link>
            </div>


            <section className="text-gray-600 body-font min-h-screen">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col  justify-center sm:justify-around gap-4">


                        {Object.keys(items).length == 0 && <p>Sorry, all the items are out of Stock</p>}
                        {items && Object.keys(items).map((x) => {

                            return (

                                <Link href={`/admin/product/${x.slug}`}>
                                    < div className=" mb-4 2 pl-4 shadow-md flex flex-wrap min-h-40 pb-2 pt-2" key={x}>

                                        <div className=" rounded overflow-hidden h-full flex justify-center items-center w-1/6 shadow-md">
                                            <img alt="ecommerce" className=" object-top ml-auto mr-auto h-5/6 " loading='lazy' src={items[x].image} />
                                        </div>

                                        <div className="mt-4  ml-20 flex flex-row flex-wrap gap-10 w-4/6 ">

                                            <div className='flex flex-col  justify-center w-2/5 '>
                                                <h3 className="text-gray-500 text-sm tracking-widest title-font">{items[x].category}</h3>
                                                <h2 className="text-gray-900 title-font text-xl font-medium tracking-wide">{items[x].title}</h2>
                                            </div>

                                            <div className='flex flex-col justify-center w-1/4 '>
                                                <p className="mt-2">${items[x].price}</p>

                                                <div className="mt-2 flex flex-wrap gap-2">

                                                    {items[x].size.map(x => {
                                                        return <span key={x} className=' border-2 pl-1 pr-1'>{x}</span>
                                                    })}

                                                </div>

                                                <div className="mt-2 flex">

                                                    {items[x].color.map(x => {
                                                        return <div className='mr-2 border-2 rounded-full p-1 w-5 h-5' style={{ backgroundColor: `${x}` }} key={x}></div>
                                                    })}

                                                </div>
                                            </div>



                                        </div>

                                    </div>
                                </Link>

                            )
                        })
                        }



                    </div>
                </div>
            </section >






        </Layout>
    )
}

export default products


export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URL)
    }

    let products;
    if (context.query.type) {
        products = await Product.find({ category: context.query.type });
    } else {
        products = await Product.find();
    }

    let items = {};

    for (let item of products) {
        if (item.title in items) {
            if (!items[item.title].color.includes(item.color)) {
                items[item.title].color.push(item.color);
            }
            if (!items[item.title].size.includes(item.size)) {
                items[item.title].size.push(item.size);
            }
        } else {
            items[item.title] = JSON.parse(JSON.stringify(item));
            items[item.title].color = [item.color];
            items[item.title].size = [item.size];
        }
    }

    return {
        props: { items }
    };
}
