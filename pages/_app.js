import Navbar from "@/components/Navbar";
import "../styles/globals.css";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import LowerFooter from "@/components/LowerFooter";
import LoadingBar from "react-top-loading-bar";
import Searchbox from "@/components/Searchbox";

const MyApp = ({ Component, pageProps }) => {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState(false);
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const [categories, setCategories] = useState();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });

    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`/api/products/categories`);
        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }
        const results = await response.json();
        setCategories(results.categories);
        console.log("Search results:", results);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token) {
      setUser(localStorage.getItem("user")); // Ensure you're correctly setting the state
    }

    try {
      const cart = localStorage.getItem("cart");
      if (cart) {
        const parsedCart = JSON.parse(cart);
        setCart(parsedCart);
        saveCart(parsedCart); // Ensure saveCart is a valid function
      }
    } catch (e) {
      console.log(e);
      localStorage.clear(); // Clear localStorage if parsing fails
    }
  }, []);

  //saving cart to localstorage

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));

    try {
      let subt = 0;
      let keys = Object.keys(myCart);
      for (let i = 0; i < keys.length; i++) {
        subt += myCart[keys[i]].price * myCart[keys[i]].qty;
      }
      setSubTotal(subt);
    } catch (e) {
      console.log(e);
    }
  };

  //adding a item

  const addToCart = (itemCode, price, itemName, size, variant) => {
    let newCart = cart;
    if (itemCode in newCart) {
      newCart[itemCode].qty = newCart[itemCode].qty + 1;
    } else {
      newCart = {
        ...newCart,
        [itemCode]: { qty: 1, price, itemName, size, variant },
      };
    }

    setCart({ ...newCart });
    saveCart({ ...newCart });
  };

  //remove from cart

  const removeFromCart = (itemCode, price, itemName, size, variant) => {
    let newCart = cart;

    if (newCart[itemCode]["qty"] <= 1) {
      delete newCart[itemCode];
    }

    if (itemCode in newCart) {
      newCart[itemCode].qty = newCart[itemCode].qty - 1;
    } else {
      console.log("no item found");
    }

    setCart({ ...newCart });
    saveCart({ ...newCart });
  };

  //clear cart

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  //buy now
  const buyNow = async (itemCode, price, itemName, size, variant) => {
    let newCart = {};
    newCart[itemCode] = { qty: 1, price, itemName, size, variant };

    setCart({ ...newCart });
    saveCart({ ...newCart });
  };

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
  };

  //logout function

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser({ value: false });
    router.push("/login");
  };

  //toggleCart

  const [cartIsOpen, setCartIsOpen] = useState(false);
  const toggleCart = () => {
    if (cartIsOpen) {
      setCartIsOpen(false);
    } else {
      setCartIsOpen(true);
    }
  };

  return (
    <>
      <LoadingBar color="#f11946" waitingTime={100} progress={progress} />
      <Navbar
        Toast={Toast}
        toggleCart={toggleCart}
        cartIsOpen={cartIsOpen}
        key={key}
        user={user}
        logout={logout}
        cart={cart}
        addToCart={addToCart}
        clearCart={clearCart}
        subTotal={subTotal}
        removeFromCart={removeFromCart}
        categories={categories}
      />
      <div className="mt-20 md:mt-0" style={{ minHeight: "100vh" }}>
        <Component
          toggleCart={toggleCart}
          cartIsOpen={cartIsOpen}
          user={user}
          logout={logout}
          cart={cart}
          addToCart={addToCart}
          clearCart={clearCart}
          subTotal={subTotal}
          buyNow={buyNow}
          Toast={Toast}
          removeFromCart={removeFromCart}
          categories={categories}
          {...pageProps}
        />
      </div>

      <Footer />
      <LowerFooter
        cartIsOpen={cartIsOpen}
        Toast={Toast}
        toggleCart={toggleCart}
        logout={logout}
        categories={categories}
      />
    </>
  );
};
export default MyApp;
