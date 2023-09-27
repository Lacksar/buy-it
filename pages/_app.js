import Navbar from "@/components/Navbar"
import "../styles/globals.css"
import Footer from "@/components/Footer"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import { useRouter } from "next/router";
import LowerFooter from "@/components/LowerFooter";
import LoadingBar from 'react-top-loading-bar'


const MyApp = ({ Component, pageProps }) => {



  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0)
  const [user, setUser] = useState({ value: false })
  const [key, setKey] = useState(0)
  const [progress, setProgress] = useState(0)
  const router = useRouter();

  useEffect(() => {

    router.events.on("routeChangeStart", () => {
      setProgress(40)
    })

    router.events.on("routeChangeComplete", () => {
      setProgress(100)
    })


  })


  useEffect(() => {

    let token = localStorage.getItem("token")
    if (token) {
      setUser({ value: token })
      setKey(Math.random())
    }
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }


    } catch (e) {
      console.log(e);
      localStorage.clear()
    }

  }, [])



  //saving cart to localstorage

  const saveCart = (myCart) => {


    localStorage.setItem("cart", JSON.stringify(myCart))

    try {
      let subt = 0;
      let keys = Object.keys(myCart)
      for (let i = 0; i < keys.length; i++) {
        subt += myCart[keys[i]].price * myCart[keys[i]].qty;
      }
      setSubTotal(subt)


    } catch (e) {
      console.log(e)
    }
  }



  //adding a item

  const addToCart = (itemCode, price, itemName, size, variant) => {

    let newCart = cart;
    if (itemCode in newCart) {

      newCart[itemCode].qty = newCart[itemCode].qty + 1

    }

    else {
      newCart = { ...newCart, [itemCode]: { qty: 1, price, itemName, size, variant } }
    }



    setCart({ ...newCart })
    saveCart({ ...newCart })




  }




  //remove from cart

  const removeFromCart = (itemCode, price, itemName, size, variant) => {

    let newCart = cart;

    if (newCart[itemCode]['qty'] <= 1) {
      delete newCart[itemCode];
    }

    if (itemCode in newCart) {

      newCart[itemCode].qty = newCart[itemCode].qty - 1


    }



    else {
      console.log("no item found")
    }



    setCart({ ...newCart })
    saveCart({ ...newCart })





  }



  //clear cart

  const clearCart = () => {

    setCart({});
    saveCart({});
    Toast("success", "Cart Cleared!")

  }



  //buy now 
  const buyNow = async (itemCode, price, itemName, size, variant) => {

    let newCart = {};


    newCart = { [itemCode]: { qty: 1, price, itemName, size, variant } }




    setCart({ ...newCart })
    saveCart({ ...newCart })


  }

  //toast 
  const Toast = (type, text) => {
    if (type == "success") {
      toast.success(text, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    if (type == "error") {
      toast.error(text, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

  }


  //logout function

  const logout = () => {

    localStorage.removeItem("token")
    setUser({ value: false })
    router.push("/login")

  }




  //toggleCart

  const [cartIsOpen, setCartIsOpen] = useState(false)
  const toggleCart = () => {

    if (cartIsOpen) {
      setCartIsOpen(false);
    }
    else {
      setCartIsOpen(true)
    }


  }








  return <>
    <LoadingBar color='#f11946' waitingTime={100} progress={progress} />
    <Navbar Toast={Toast} toggleCart={toggleCart} cartIsOpen={cartIsOpen} key={key} user={user} logout={logout} cart={cart} addToCart={addToCart} clearCart={clearCart} subTotal={subTotal} removeFromCart={removeFromCart} />
    <Component toggleCart={toggleCart} cartIsOpen={cartIsOpen} user={user} logout={logout} cart={cart} addToCart={addToCart} clearCart={clearCart} subTotal={subTotal} buyNow={buyNow} Toast={Toast} removeFromCart={removeFromCart} {...pageProps} />

    <Footer />
    <LowerFooter cartIsOpen={cartIsOpen} Toast={Toast} toggleCart={toggleCart} logout={logout} />

  </>
}
export default MyApp