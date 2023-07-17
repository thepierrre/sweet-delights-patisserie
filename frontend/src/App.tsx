import Header from "./components/header/Header";
import ProductNavigation from "./components/shop/ProductNavigation";
import Recommended from "./components/shop/recommended/Recommended";

import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Header />
      <ProductNavigation />
      <Recommended />
    </div>
  );
};

export default App;
