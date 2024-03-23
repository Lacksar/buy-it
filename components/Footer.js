import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BsFacebook } from "react-icons/bs"
import { AiFillYoutube, AiFillLinkedin } from "react-icons/ai"
import { useRouter } from 'next/router'

function Footer() {

    const router = useRouter();
    const isAdminRoute = router.pathname.split("/").includes("admin")


    return (

        <>
            {!isAdminRoute && <>
                <footer className="text-white body-font bg-slate-900 mb-14 md:mb-0">
                    <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left justify-center align-middle">
                            <Link href={"/"} className='flex justify-center'>

                                <Image src="/logo.png" alt="logo" priority className='rounded-md' width={100} height={100} />


                            </Link>
                        </div>
                        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                                <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">CATEGORIES</h2>
                                <nav className="list-none mb-10">
                                    <li>
                                        <Link href={"/tshirts"} className="text-white hover:text-gray-50">T-shirts</Link>
                                    </li>
                                    <li>
                                        <Link href={"/hoodies"} className="text-white hover:text-gray-50">Hoodies</Link>
                                    </li>
                                    <li>
                                        <Link href={"/stickers"} className="text-white hover:text-gray-50">Stickers</Link>
                                    </li>
                                    <li>
                                        <Link href={"/mugs"} className="text-white hover:text-gray-50">Mugs</Link>
                                    </li>
                                </nav>
                            </div>
                            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                                <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">CATEGORIES</h2>
                                <nav className="list-none mb-10">
                                    <li>
                                        <Link href={"/"} className="text-white hover:text-gray-50">First Link</Link>
                                    </li>
                                    <li>
                                        <Link href={"/"} className="text-white hover:text-gray-50">Second Link</Link>
                                    </li>
                                    <li>
                                        <Link href={"/"} className="text-white hover:text-gray-50">Third Link</Link>
                                    </li>
                                    <li>
                                        <Link href={"/"} className="text-white hover:text-gray-50">Fourth Link</Link>
                                    </li>
                                </nav>
                            </div>
                            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                                <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">CATEGORIES</h2>
                                <nav className="list-none mb-10">
                                    <li>
                                        <Link href={"/"} className="text-white hover:text-gray-50">First Link</Link>
                                    </li>
                                    <li>
                                        <Link href={"/"} className="text-white hover:text-gray-50">Second Link</Link>
                                    </li>
                                    <li>
                                        <Link href={"/"} className="text-white hover:text-gray-50">Third Link</Link>
                                    </li>
                                    <li>
                                        <Link href={"/"} className="text-white hover:text-gray-50">Fourth Link</Link>
                                    </li>
                                </nav>
                            </div>
                            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                                <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">CATEGORIES</h2>
                                <nav className="list-none mb-10">
                                    <li>
                                        <Link href={"/"} className="text-white hover:text-gray-50">First Link</Link>
                                    </li>
                                    <li>
                                        <Link href={"/"} className="text-white hover:text-gray-50">Second Link</Link>
                                    </li>
                                    <li>
                                        <Link href={"/"} className="text-white hover:text-gray-50">Third Link</Link>
                                    </li>
                                    <li>
                                        <Link href={"/"} className="text-white hover:text-gray-50">Fourth Link</Link>
                                    </li>
                                </nav>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-row items-center justify-center pb-4 gap-4'>
                        <Link href={""}><BsFacebook className='text-2xl hover:scale-150 transition-transform hover:text-blue-600' /></Link>
                        <Link href={"/"}><AiFillYoutube className='text-2xl hover:scale-150 transition-transform hover:text-red-600' /></Link>
                        <Link href={"/"}><AiFillLinkedin className='text-2xl hover:scale-150 transition-transform hover:text-blue-500' /></Link>
                        <Link href={"/"}></Link>
                    </div>
                </footer>
            </>}
        </>
    )
}











export default Footer