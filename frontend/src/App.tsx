import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "./axiosInstance";
import Header from "./components/header/Header";
import ProductNavigation from "./components/shop/ProductNavigation";
import Footer from "./components/authorship/Footer";
import LoginContext from "./context/login-context";
import ProductsContext from "./context/products-context";
import "./App.css";

const App = () => {
  const { setCart } = useContext(ProductsContext);
  const { userId, setLoggedIn, setUserId } = useContext(LoginContext);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("login/me");
        const { name, _id } = response.data.user;
        setLoggedIn(name);
        setUserId(_id);
      } catch {
        // empty on purpose
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axios.get(`carts/${userId}`);
        const cartItems = response.data.cart.cartProducts;
        let fetchedItems = cartItems.map((item: any) => ({
          id: item._id,
          name: item.name,
          price: item.price,
          amount: item.amount,
        }));
        setCart({ items: fetchedItems });
      } catch (err) {
        console.log(err);
      }
    };
    if (userId) {
      getCart();
    }
  }, [userId]);

  // useEffect(() => {
  //   const cartFromLocalStorage = getCartFromLocalStorage();
  //   setCart(cartFromLocalStorage);
  // }, []);

  return (
    <div className="app">
      <Header />
      <ProductNavigation />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
