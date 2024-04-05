// index.js or any other page

import React, { useEffect } from 'react';
import Layout from './Layout';
import { useRouter } from 'next/router';

const Index = () => {

    const router = useRouter();

    useEffect(() => {

        router.push("/admin/dashboard")
    }, [])

    return (
        <Layout>

            <div>
                <h1>Main Page</h1>
                <p>This is the content of the main page.</p>
            </div>
        </Layout>
    );
};

export default Index;
