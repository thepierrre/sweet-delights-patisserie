import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import ProductNavigation from "./components/shop/ProductNavigation";
import Footer from "./components/authorship/Footer";
import ProductsContext from "./context/products-context";
import "./App.css";

const App = () => {
  const { setCart, getCartFromLocalStorage } = useContext(ProductsContext);

  useEffect(() => {
    const cartFromLocalStorage = getCartFromLocalStorage();
    setCart(cartFromLocalStorage);
  }, []);

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
