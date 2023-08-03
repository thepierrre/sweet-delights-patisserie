import { useState, ReactNode } from "react";
import ProductsContext, {
  Cart,
  Product,
  RecommendedProduct,
  PurchaseInfo,
} from "../context/products-context";

interface Props {
  children: ReactNode;
}

const ProductsContextProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const [purchaseInfo, setPurchaseInfo] = useState<PurchaseInfo>({
    paymentOption: "cash", // Set the initial value of paymentOption to "cash"
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    postalCode: "",
  } as PurchaseInfo);
  const [products, setProducts] = useState<Product[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<
    RecommendedProduct[]
  >([]);
  const [cart, setCart] = useState<Cart>({ items: [] });

  const saveCartToLocalStorage = (cart: Cart): void => {
    const cartJSON = JSON.stringify(cart);
    localStorage.setItem("cart", cartJSON);
  };

  const addToCart = (
    id: string,
    name: string,
    price: number,
    amount: number
  ): void => {
    setCart((prevCart: Cart) => {
      const existingItemIndex = prevCart.items.findIndex(
        (item) => item.id === id
      );

      if (existingItemIndex !== -1) {
        const updatedCartItems = [...prevCart.items];
        updatedCartItems[existingItemIndex].amount += 1;
        const updatedCart = { ...prevCart, items: updatedCartItems };
        saveCartToLocalStorage(updatedCart); // Save updated cart to localStorage
        return updatedCart;
      } else {
        const updatedCart = {
          ...prevCart,
          items: [...prevCart.items, { id, name, price, amount: amount }],
        };
        saveCartToLocalStorage(updatedCart); // Save updated cart to localStorage
        return updatedCart;
      }
    });

    console.log(cart);

    saveCartToLocalStorage(cart);
  };

  const deleteCartFromLocalStorage = (): void => {
    localStorage.removeItem("cart");
  };

  const incrementCartElement = (id: string): void => {
    const existingItemIndex = cart.items.findIndex((item) => item.id === id);

    if (existingItemIndex !== -1) {
      setCart((prevCart: Cart) => {
        const updatedCartItems = [...prevCart.items];
        updatedCartItems[existingItemIndex].amount += 1;
        const updatedCart = { ...prevCart, items: updatedCartItems };
        saveCartToLocalStorage(updatedCart);
        return updatedCart;
      });
    }

    console.log(cart);
  };

  const decreaseCartElement = (id: string): void => {
    const existingItemIndex = cart.items.findIndex((item) => item.id === id);

    if (existingItemIndex !== -1) {
      setCart((prevCart: Cart) => {
        const updatedCartItems = [...prevCart.items];
        if (updatedCartItems[existingItemIndex].amount === 1) {
          // If amount is already 1, remove the item from the array
          updatedCartItems.splice(existingItemIndex, 1);
        } else {
          // Decrease the amount by 1
          updatedCartItems[existingItemIndex].amount -= 1;
        }
        const updatedCart = { ...prevCart, items: updatedCartItems };
        saveCartToLocalStorage(updatedCart);
        return updatedCart;
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
        decreaseCartElement,
        deleteCartFromLocalStorage,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
