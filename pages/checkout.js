import Link from 'next/link'
import React, { useState } from 'react'
import { RxCross1 } from "react-icons/Rx"

function checkout(props) {


  const { cart, addToCart, removeFromCart, subTotal, clearCart } = props;


  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [province, setProvince] = useState("")
  const [pincode, setPincode] = useState("")
  const [disabled, setDisabled] = useState(true)

  const handleChange = (e) => {

    if (e.target.name == "name") {
      setName(e.target.value);
    }

    else if (e.target.name == "email") {
      setEmail(e.target.value);
    }

    else if (e.target.name == "address") {
      setAddress(e.target.value);
    }

    else if (e.target.name == "phone") {
      setPhone(e.target.value);
    }

    else if (e.target.name == "city") {
      setCity(e.target.value);
    }

    else if (e.target.name == "province") {
      setProvince(e.target.value);
    }

    else if (e.target.name == "pincode") {
      setPincode(e.target.value);
    }
    else {

    }


    if (email && address && phone && city && province && pincode) {
      setDisabled(false);
    }
    else {
      setDisabled(true)
    }




  }





  return (

    <>



      <div className=' ml-auto mr-auto w-5/6 mt-10 mb-20'>
        <h1 className='text-2xl text-center font-semibold text-gray-900 mb-5'>Checkout</h1>



        {/* Delivery Details */}

        <div className='mt-10'>
          <h2 className='text-md text-xl  mt-4 font-semibold mb-3'>1. Delivery Details</h2>

          <div className='grid sm:grid-cols-2 gap-4'>



            <div className='flex flex-col gap-2 '>
              <label>Name</label>
              <input onChange={handleChange} value={name} name="name" className='pl-2 h-10 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800' />
            </div>

            <div className='flex flex-col gap-2'>
              <label>Email</label>
              <input onChange={handleChange} value={email} name="email" type="email" className='pl-2 h-10 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800' />
            </div>

            <div className='flex flex-col gap-2 sm:col-span-2'>
              <label>Address</label>
              <textarea onChange={handleChange} value={address} name="address" className='pt-2 pl-2 h-16 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800' ></textarea>
            </div>

            <div className='flex flex-col gap-2'>
              <label>Phone</label>
              <input onChange={handleChange} value={phone} name="phone" type='number' className='pl-2 h-10 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800' />
            </div>

            <div className='flex flex-col gap-2'>
              <label>Pincode</label>
              <input onChange={handleChange} value={pincode} name="pincode" type="number" className='pl-2 h-10 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800' />
            </div>


            <div className='flex flex-col gap-2'>
              <label>Province</label>
              <input onChange={handleChange} value={province} name="province" className='pl-2 h-10 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800' />
            </div>

            <div className='flex flex-col gap-2'>
              <label>City</label>
              <input onChange={handleChange} value={city} name="city" className='pl-2 h-10 border border-gray -300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800' />
            </div>



          </div>

        </div>








        {/* Review Items  */}


        <div>
          <h2 className='text-md text-xl  mt-4 font-semibold mb-3'>1. Review Items</h2>
          <div className=' w-full sideber bg-gray-100 border-2 border-black text-black  p-10 rounded-md'>


            <div className=' mt-5 overflow-y-scroll'>

              <ol>
                {Object.keys(cart).length == 0 && <div>No item in the cart!</div>}

                {

                  !Object.keys(cart).length == 0 &&

                  Object.keys(cart).map((k) => {


                    return <li className='flex items-center justify-start flex-wrap' key={k}>
                      <img alt="ecommerce" className="h-20 mr-2 " src="https://lesdeux.co.uk/cdn/shop/products/Crew_Hoodie-Hoodie-LDM202010-460460-Dark_Navy_600x.jpg?v=1681807282" />
                      <div className='flex flex-col sm:flex-row '>
                        <p className='mr-2'>{cart[k].itemName + ` (${cart[k].size}/${cart[k].variant})`}</p>
                        <div>
                          <button className=' bg-blue-700 w-7 h-7 rounded-full' onClick={() => { removeFromCart(k, cart[k].price, cart[k].itemName, cart[k].size, cart[k].variant) }}>-</button>
                          <span className='ml-2 mr-2'>{cart[k].qty}</span>
                          <button className='bg-blue-700 w-7 h-7 rounded-full' onClick={() => { addToCart(k, cart[k].price, cart[k].itemName, cart[k].size, cart[k].variant) }}>+</button>
                        </div>
                      </div>
                    </li>


                  })
                }

              </ol>

              <h1 className='mt-5 font-bold text-md'>SubTotal: रु{subTotal}</h1>

            </div>


          </div>

          <button className={`${disabled ? "disabled bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"} mt-4   py-2 px-4 rounded w-40`}>Pay {subTotal}</button>

        </div>




      </div>



    </>

  )
}

export default checkout