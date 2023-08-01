import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import ProductNavigation from "./components/shop/ProductNavigation";
import Footer from "./components/authorship/Footer";
import "./App.css";

const App = () => {
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
