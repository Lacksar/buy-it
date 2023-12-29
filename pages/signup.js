import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function signup(props) {

  const { Toast } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    }
    if (e.target.name == "email") {
      setEmail(e.target.value);

    }
    if (e.target.name == "password") {
      setPassword(e.target.value);

    }


  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    let data = { name, email, password };
    let res = await fetch("/api/user/signup",
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
      setName("");
      setEmail("");
      setPassword("");

      Toast("success", "User Created!")
      router.push("/login")
      return;

    }
    console.log(response)

    if (!response.success) {
      Toast("error", `${response.message}`)
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/")
    }
  })




  return (
    <section className="bg-gray-50 dark:bg-gray-900">

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


      <div className="flex flex-col items-center justify-center px-6 py-8 mt-20 md:mt-0 mb-20 md:mb-0 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Signup for an account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">

              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                <input onChange={handleChange} value={name} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nixal Timsina" required />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input onChange={handleChange} value={email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="hello@yahoo.com" required />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input onChange={handleChange} value={password} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>



              <div className="flex items-center justify-between">
                <div className="flex items-start">


                </div>
                <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
              </div>

              <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800">Sign Up</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <Link href={"/login"} className="font-medium text-blue-600 hover:underline dark:text-blue-500">Log In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default signup