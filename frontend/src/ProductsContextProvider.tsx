import { useState, ReactNode } from "react";

import ProductsContext, {
  Cart,
  Product,
  RecommendedProduct,
  PurchaseInfo,
} from "./context/products-context";

interface Props {
  children: ReactNode;
}

const ProductsContextProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const [purchaseInfo, setPurchaseInfo] = useState<PurchaseInfo>(
    {} as PurchaseInfo
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<
    RecommendedProduct[]
  >([]);
  const [cart, setCart] = useState<Cart>({ items: [] });

  const addToCart = (id: string, name: string, amount: number): void => {
    const existingItemIndex = cart.items.findIndex((item) => item.id === id);

    if (existingItemIndex !== -1) {
      setCart((prevCart: Cart) => {
        const updatedCartItems = [...prevCart.items];
        updatedCartItems[existingItemIndex].amount + amount;
        const updatedCart = { ...prevCart, items: updatedCartItems };
        saveCartToLocalStorage(updatedCart); // Save updated cart to localStorage
        return updatedCart;
      });
    } else {
      setCart((prevCart: Cart) => {
        const updatedCart = {
          ...prevCart,
          items: [...prevCart.items, { id, name, amount: 1 }],
        };
        saveCartToLocalStorage(updatedCart); // Save updated cart to localStorage
        return updatedCart;
      });
    }

    console.log(cart);

    // Nested function to save the cart to localStorage
    function saveCartToLocalStorage(cart: Cart): void {
      const cartJSON = JSON.stringify(cart);
      localStorage.setItem("cart", cartJSON);
    }
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
        purchaseInfo,
        setPurchaseInfo,
        recommendedProducts,
        products,
        cart,
        setRecommendedProducts,
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
