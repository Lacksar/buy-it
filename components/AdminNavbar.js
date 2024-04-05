import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";


function AdminNavbar(props) {

    const router = useRouter();
    const isAdminRoute = router.pathname.split("/").includes("admin")

    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);

    // Function to toggle the user menu popup
    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    // Function to close the user menu when clicked outside
    const closeUserMenuOnClickOutside = (event) => {
        if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
            setIsUserMenuOpen(false);
        }
    };

    // Effect to add the click event listener when the menu is open
    useEffect(() => {
        if (isUserMenuOpen) {
            document.addEventListener("click", closeUserMenuOnClickOutside);
        } else {
            document.removeEventListener("click", closeUserMenuOnClickOutside);
        }

        // Cleanup the event listener when the component is unmounted
        return () => {
            document.removeEventListener("click", closeUserMenuOnClickOutside);
        };
    }, [isUserMenuOpen]);



    return (
        <>

            {isAdminRoute && <>
                <nav className="bg-gray-800 fixed top-0 w-full z-50 ">
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8" ref={userMenuRef}>
                        <div className="relative flex h-16 items-center justify-between">

                            <div className="flex flex-1 ml-5 sm:items-stretch justify-start sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <img className="h-8 w-auto" src="/logo.png" alt="Your Company" />
                                    <p className="text-white">Buy-It</p>
                                </div>

                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">View notifications</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                    </svg>
                                </button>

                                <div className="relative ml-3">
                                    <div onClick={toggleUserMenu}>
                                        <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                            <span className="absolute -inset-1.5"></span>
                                            <span className="sr-only">Open user menu</span>

                                            <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                        </button>
                                    </div>

                                    {/* the popup */}

                                    {isUserMenuOpen &&
                                        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">

                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>




                <Sidebar /></>

            }

        </>
    );
}


export default AdminNavbar;