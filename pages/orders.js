import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Order from '@/models/Order'
import mongoose from 'mongoose'

const orders = (props) => {

    const router = useRouter()
    const [myOrders, setMyOrders] = useState()


    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push("/")
        }

        else {
            async function fetchOrders() {
                let token = localStorage.getItem('token');
                let requestBody = JSON.stringify({ token: token });

                let res = await fetch("/api/products/myorders", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json' // Set the Content-Type header
                    },
                    body: requestBody
                });
                let response = await res.json();
                setMyOrders(response)
                console.log(response)
            }

            fetchOrders();
        }




    }, [])







    return (






        <div className="relative overflow-x-auto container ml-auto mr-auto mb-10 min-h-screen mt-10">
            <h1 className='text-2xl mb-5 mt-5 text-center'>My Orders</h1>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Order Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            SubTotal
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Address
                        </th>
                    </tr>
                </thead>
                <tbody>


                    {myOrders.map((x) => {

                        return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
                    })}


                </tbody>


            </table>
        </div >







    )
}

export default orders







