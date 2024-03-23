import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { AiOutlineShoppingCart, AiFillHome } from "react-icons/ai"
import { BsFillCartFill, BiSolidSearchAlt2 } from "react-icons/bs"
import { RiAccountCircleFill } from "react-icons/ri"
import { RxCross1 } from "react-icons/Rx"
import { ToastContainer } from 'react-toastify';



export default function lowerFooter(props) {

    const router = useRouter();
    const isAdminRoute = router.pathname.split("/").includes("admin")
    const { logout, toggleCart, Toast } = props;
    const [token, setToken] = useState()
    const [show, setShow] = useState(false)
    const toggle = () => {
        if (show) {
            setShow(false)

        }
        else {
            setShow(true)

        }
    }

    useEffect(() => {

        setToken(localStorage.getItem("token"))

    })


    return (
        <>
            {!isAdminRoute && <>
                <div className='md:hidden h-14 fixed left-0 w-full border-t-2 border-white bottom-0 bg-gray-800 text-white z-50'>

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

                    <div className="flex w-full h-full justify-around items-center">


                        <Link href={"/"}> <AiFillHome className="text-2xl cursor-pointer hover:text-blue-600 " /></Link>
                        <BsFillCartFill className="text-2xl cursor-pointer hover:text-blue-600 " onClick={toggleCart} />
                        <RiAccountCircleFill className="text-2xl cursor-pointer hover:text-blue-600 " onClick={toggle} />




                    </div>

                    <div className={`${!show ? "hidden" : ""} flex flex-col max-w-sm w-1/3  pl-5 pr-5 pt-2 pb-2 absolute right-5 bottom-16 bg-gray-300 rounded-md text-black`}>


                        <RxCross1 className="cursor-pointer text-xl absolute right-3 top-3 " onClick={toggle} />

                        {token ? <>
                            <Link href={"/myprofile"} onClick={toggle} className="w-full mb-2  hover:text-gray-600 mt-4">My Profile</Link>
                            <Link href={"/order"} onClick={toggle} className="w-full mb-2  hover:text-gray-600">Orders</Link>
                            <button onClick={() => { logout(); toggle(); Toast("success", "Successfully Logged Out") }} className="text-left w-full mb-2  hover:text-gray-600">Logout</button>
                        </> : <Link href={"/login"} onClick={toggle} className="w-full mb-2  hover:text-gray-600 mt-10">Login</Link>

                        }

                    </div>

                </div>
            </>}</>

    )
}