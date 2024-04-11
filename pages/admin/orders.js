import React from 'react'
import Layout from './Layout'
import Order from '@/models/Order'
import mongoose from 'mongoose'
import { useRouter } from 'next/router'

const orders = (props) => {

    const { usersOrder } = props;
    const router = useRouter();
    return (
        <>
            <Layout>




                <div className="container w-full md:w-4/5 xl:w-4/5 mx-auto px-2 overflow-auto">
                    <h1 className=" font-sans font-bold break-normal text-center px-2 py-8 text-3xl md:text-2xl">
                        Orders
                    </h1>

                    <table className="overflow-scroll stripe hover border-collapse border-spacing-20" style={{ width: '100%', paddingTop: '1em', paddingBottom: '1em', border: '1px solid #e2e8f0' }}>
                        <thead>
                            <tr className='bg-gray-300'>
                                <th className="border px-4 py-2">Order Id</th>
                                <th className="border px-4 py-2">Customer</th>
                                <th className="border px-4 py-2">Date</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">Products</th>
                                <th className="border px-4 py-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>

                            {usersOrder.map((x, y) => {

                                return (
                                    <tr key={y} className='hover:bg-blue-300 cursor-pointer border-b-2 ' onClick={() => router.push(`/admin/order/${x._id}`)}>

                                        <td className="px-4 py-2 text-center">{x.orderId}</td>
                                        <td className="px-4 py-2 text-center">{x.userId}</td>
                                        <td className="px-4 py-2 text-center">{new Date(x.createdAt).toLocaleDateString("en-US")}</td>
                                        <td className="px-4 py-2 text-center"><span className={` p-1 rounded-lg ${x.status == "pending" ? "bg-red-300" : "bg-green-300"}`}>{x.status}</span></td>

                                        <td className="px-4 py-2 text-center">{x.products.map((product, index) => {
                                            const key = Object.keys(product)[0];
                                            const { itemName, size, variant } = product[key];
                                            return <><p key={index}>{`${itemName}(${size}/${variant})`}</p></>
                                        })} </td>

                                        <td className="px-4 py-2 text-center">{x.amount}</td>
                                    </tr>

                                )

                            })


                            }

                        </tbody>
                    </table>
                </div>







            </Layout>
        </>
    )
}

export default orders





export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URL)
    }

    let usersOrder = await Order.find()






    return {
        props: { usersOrder: JSON.parse(JSON.stringify(usersOrder)) }
    }

}