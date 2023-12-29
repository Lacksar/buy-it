import Forget from '@/models/Forget';
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import mongoose from 'mongoose';

function forget(props) {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { Toast, token } = props;

    console.log(token.userid)
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleEmailSubmit = async (e) => {

        e.preventDefault();

        let data = { email };
        let res = await fetch("/api/user/forgetpassword",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            })
        let response = await res.json();
        if (response.success) {
            Toast("success", "Code sent to your email")

        }
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        let data = { id: token.userid, password };
        let res = await fetch("/api/user/changepassword",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            })
        let response = await res.json();
        if (response.success) {
            Toast("success", "Code sent to your email")

        }


    }




    useEffect(() => {
        if (localStorage.getItem("token")) {
            router.push("/")
        }






    }, [])



    return (

        <>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="light"
            />

            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mt-20 md:mt-0 mb-20 md:mb-0 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">

                        {!router.query.token &&
                            <>
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                        Forget Password?
                                    </h1>
                                    <form className="space-y-4 md:space-y-6" action="#">
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                            <input onChange={handleEmailChange} value={email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="hello@yahoo.com" />
                                        </div>

                                        <button onClick={handleEmailSubmit} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800">Get Code</button>
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                            Login to your account? <Link href={"/login"} className="font-medium text-blue-600 hover:underline dark:text-blue-500">Log In</Link>
                                        </p>
                                    </form>
                                </div>
                            </>}



                        {router.query.token && token &&
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Create New Password
                                </h1>
                                <form className="space-y-4 md:space-y-6" action="#">
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Create new Password</label>
                                        <input onChange={handlePasswordChange} value={password} type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" />
                                    </div>

                                    <button onClick={handlePasswordSubmit} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800">Change Password</button>

                                </form>
                            </div>

                        }






                        {router.query.token && !token &&
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Token has been expired!
                                </h1>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                                    Try generating new one? <Link href={"/forget"} className="font-medium text-blue-600 hover:underline dark:text-blue-500">Forget Password</Link>
                                </p>

                            </div>

                        }


                    </div>
                </div>
            </section>

        </>
    )
}

export default forget




export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URL)
    }


    let token = await Forget.findOne({ token: context.query.token });
    if (token) {
        return {
            props: { token: JSON.parse(JSON.stringify(token)) }
        }
    }

    else {
        return { props: { token: null } }
    }








}