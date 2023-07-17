import Header from "./components/header/Header";
import ProductNavigation from "./components/shop/ProductNavigation";
import Recommended from "./components/shop/recommended/Recommended";
import Products from "./components/shop/products/Products";

import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Header />
      <ProductNavigation />
      <Products />
      {/* <Recommended /> */}
    </div>
  );
};

export default App;
