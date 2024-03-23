import React from 'react'
import Layout from './Layout'
import User from '@/models/User'
import connectDb from "@/middleware/mongoose";
import mongoose from 'mongoose';

const users = (props) => {

    const { userData } = props;
    console.log(userData)

    return (
        <Layout>

            <h1 className='text-center text-2xl mb-2'>Users</h1>
            <div className="flex flex-col ml-10 mr-10">

                {userData.map((x, y) => {

                    return (

                        <div class="py-3 border-b-2  mb-3 md:pl-20" key={x}>
                            <div class="flex items-center space-x-2">
                                <div class="flex-shrink-0">
                                    <img class="w-8 h-8 rounded-full" src="../dummy.png" alt="Neil image" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {x.name}
                                    </p>
                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {x.email}
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {x.phone == 0 ? "Not Available" : x.phone}
                                    {/* she */}
                                </div>
                            </div>
                        </div>



                    );


                })}

            </div>

        </Layout>
    )
}

export default users






export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URL)
    }




    let userData = await User.find();
    return { props: { userData: JSON.parse(JSON.stringify(userData)) } }








}