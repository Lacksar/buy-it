// components/Layout.js

import AdminNavbar from '@/components/AdminNavbar';
import Sidebar from '@/components/Sidebar';
import React from 'react';

const Layout = ({ children }) => {
    return (

        <><AdminNavbar />
            <div style={{ display: 'flex' }}>

                <Sidebar />
                <div className='sm:ml-64 mt-20 md:mt-0 w-full'>
                    {children}
                </div>
            </div>

        </>
    );
};

export default Layout;
