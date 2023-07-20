import { useState } from "react";

import ProductsContext from "./context/products-context";

const ProductsContextProvider = (props) => {
  const { children } = props;
  const [products, setProducts] = useState([]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
