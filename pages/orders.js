import React from 'react'
import { useRouter } from 'next/router'
import Order from '@/models/Order'
import mongoose from 'mongoose'

const orders = (props) => {

    const router = useRouter()
    const { user } = props;

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push("/")
        }
    })







    return (






        <div className="relative overflow-x-auto container ml-auto mr-auto mb-10">
            <h1 className='text-2xl mb-5 mt-5 text-center'>My Orders</h1>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Color
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Apple MacBook Pro 17"
                        </th>
                        <td className="px-6 py-4">
                            Silver
                        </td>
                        <td className="px-6 py-4">
                            Laptop
                        </td>
                        <td className="px-6 py-4">
                            $2999
                        </td>
                    </tr>

                </tbody>
            </table>
        </div >







    )
}

export default orders





export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URL)
    }

    let orders = await Order.find({ userId: user._id })





    return {
        props: { orders: orders }
    }


}

