import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import mongoose from 'mongoose';
import Order from '@/models/Order';
import Pagenotfound from '@/components/Pagenotfound';



function myorder(props) {

    const router = useRouter();


    const { order } = props;
    const products = order ? order.products[0] : false;


    return (
        <>
            {order ? <>
                <section className="text-gray-600 body-font overflow-x-auto min-h-screen" >
                    <div className="container px-5 py-24 mx-auto">
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <div className="lg:w-full w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">Buy-It</h2>
                                <h1 className="text-gray-900 text-xl md:text-2xl title-font md:font-bold mb-2 mt-2">#Order Id: {order.orderId}</h1>
                                <p className="text-gray-900  md:font-semibold mb-5 mt-2 pl-4">Created at: {new Date(order.createdAt).toLocaleDateString("en-US")}</p>


                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Product name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Quantity
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Per price
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Total
                                            </th>
                                        </tr>
                                    </thead>


                                    <tbody>


                                        {Object.keys(products).map((x, y) => {

                                            return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer" key={y} onClick={() => router.push(`/product/${x}`)}>

                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {products[x].itemName} ({products[x].variant}/{products[x].size})
                                                </th>
                                                <td className="px-6 py-4">
                                                    {products[x].qty}
                                                </td>
                                                <td className="px-6 py-4">
                                                    Rs. {products[x].price}
                                                </td>
                                                <td className="px-6 py-4">
                                                    Rs. {products[x].price * products[x].qty}
                                                </td>
                                            </tr>
                                        })}

                                    </tbody>
                                </table>







                                <div className="flex mt-10 border-t-2 pt-5">
                                    <button className="flex text-white bg-indigo-500 border-0 px-2 py-2 md:px-6 focus:outline-none hover:bg-indigo-600 rounded">Track Order</button>
                                    <span className="title-font font-medium text-xl md:text-2xl sm:text-xl ml-auto text-gray-900">SubTotal: Rs. {order.amount}</span>
                                </div>
                            </div>
                            {/* <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" /> */}
                        </div>
                    </div>
                </section></> : <><Pagenotfound /></>
            }

        </>
    )
}

export default myorder




export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URL)
    }

    if (!mongoose.Types.ObjectId.isValid(context.query.id)) {
        return { props: { order: false } };
    }

    let order = await Order.findById(context.query.id);
    return { props: { order: JSON.parse(JSON.stringify(order)) } }








}