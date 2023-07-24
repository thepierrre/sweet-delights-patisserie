import { useState, ReactNode } from "react";

import ProductsContext, { Cart, Product } from "./context/products-context";

interface Props {
  children: ReactNode;
}

const ProductsContextProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart>({ items: [] });

  const addToCart = (id: string, name: string): void => {
    const existingItemIndex = cart.items.findIndex((item) => item.id === id);

    if (existingItemIndex !== -1) {
      setCart((prevCart: Cart) => {
        const updatedCartItems = [...prevCart.items];
        updatedCartItems[existingItemIndex].amount += 1;
        return { ...prevCart, items: updatedCartItems };
      });
    } else {
      setCart((prevCart: Cart) => ({
        ...prevCart,
        items: [...prevCart.items, { id, name, amount: 1 }],
      }));
    }

    console.log(cart);
  };

  const incrementCartElement = (id: string): void => {
    const existingItemIndex = cart.items.findIndex((item) => item.id === id);

    if (existingItemIndex !== -1) {
      setCart((prevCart: Cart) => {
        const updatedCartItems = [...prevCart.items];
        updatedCartItems[existingItemIndex].amount += 1;
        return { ...prevCart, items: updatedCartItems };
      });
    }

    console.log(cart);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        cart,
        setProducts,
        setCart,
        addToCart,
        incrementCartElement,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
