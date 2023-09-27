import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Head from 'next/head'
import React from 'react'

function index() {
  return (
    <>

      <Head>
        <title>Buy-It</title>
        <link rel="icon" href="logo.png" type="image/x-icon" />

      </Head>


      <div className='overflow-hidden flex justify-center ' >
        <img src='/home.jpg' alt='Hoodie' className='h-full ' />
      </div>






      <section className="text-gray-600 body-font mb-4">
        <div className="container px-5  mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Buy-It Provides</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Good Quality Products for your Style</p>
          </div>

        </div>
        <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Contact Us</button>
      </section>




    </>
  )
}

export default index