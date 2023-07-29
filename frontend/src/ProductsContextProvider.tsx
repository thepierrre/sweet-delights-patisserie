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
