import React from 'react'
import { useRouter } from 'next/router'
function order() {
  const router = useRouter()
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/")
    }
  })

  return (
    <section class="text-gray-600 body-font overflow-hidden">
      <div class="container px-5 py-24 mx-auto">
        <div class="lg:w-4/5 mx-auto flex flex-wrap">
          <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 class="text-sm title-font text-gray-500 tracking-widest">Buy-It</h2>
            <h1 class="text-gray-900 text-2xl md:text-3xl title-font font-bold mb-4 mt-2">#Order Id: 223344</h1>


            <div class="grid mb-4 grid-cols-3 mt-10">
              <a class="flex-grow font-bold py-2 text-md md:text-lg px-1">Name</a>
              <a class="flex-grow font-bold py-2 text-md md:text-lg px-1 text-right">Quantity</a>
              <a class="flex-grow font-bold py-2 text-md md:text-lg px-1 text-right">Item Total</a>
            </div>



            <div class="grid grid-cols-3 border-t border-gray-200 py-2">
              <span class="flex-grow  py-2  px-1">Wear the code</span>
              <span class="flex-grow  py-2  px-1 text-right">3</span>
              <span class="flex-grow  py-2  px-1 text-right">500</span>
            </div>





            <div class="flex mt-10 border-t-2 pt-5">
              <button class="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Track Order</button>
              <span class="title-font font-medium text-xl md:text-2xl sm:text-xl ml-auto text-gray-900">SubTotal: $58.00</span>
            </div>
          </div>
          <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
        </div>
      </div>
    </section>
  )
}

export default order