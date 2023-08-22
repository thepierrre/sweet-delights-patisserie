import { useContext, useState, ReactNode } from "react";
import ProductsContext, {
  Cart,
  Product,
  RecommendedProduct,
  PurchaseInfo,
} from "../context/products-context";
import LoginContext from "../context/login-context";
import axios from "../axiosInstance";
import _ from "lodash";

interface Props {
  children: ReactNode;
}

const ProductsContextProvider: React.FC<Props> = (props) => {
  const { loggedIn, userId } = useContext(LoginContext);
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

  const getCartFromLocalStorage = () => {
    const cartJSON = localStorage.getItem("cart");
    if (cartJSON) {
      return JSON.parse(cartJSON);
    } else {
      return { items: [] }; // Return an empty cart if it's not found in localStorage
    }
  };

  const saveCartToLocalStorage = (cart: Cart): void => {
    const cartJSON = JSON.stringify(cart);
    localStorage.setItem("cart", cartJSON);
  };

  const removeCartFromLocalStorage = () => {
    localStorage.removeItem("cart");
  };

  const updateCart = async () => {
    const cartFromLocalStorage: any = getCartFromLocalStorage();
    try {
      await axios.put(`carts/${userId}/update`, {
        items: cartFromLocalStorage.items,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const clearCart = async () => {
    try {
      await axios.put(`carts/${userId}/clear`);
    } catch (err) {
      console.log(err);
    }
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

      let updatedCart;
      if (existingItemIndex !== -1) {
        const updatedCartItems = _.cloneDeep(prevCart.items);
        updatedCartItems[existingItemIndex].amount += amount;
        updatedCart = { ...prevCart, items: updatedCartItems };
        saveCartToLocalStorage(updatedCart);
        updateCart();
        return updatedCart;
      } else {
        updatedCart = {
          ...prevCart,
          items: [...prevCart.items, { id, name, price, amount }],
        };
        saveCartToLocalStorage(updatedCart);
        if (loggedIn !== "") {
          updateCart();
        }
        return updatedCart;
      }
    });
  };

  const deleteCartItem = async (itemId: string): Promise<void> => {
    const existingItemIndex = cart.items.findIndex(
      (item) => item.id === itemId
    );

    if (existingItemIndex !== -1) {
      await axios.delete(`carts/${userId}/${itemId}`);
      setCart((prevCart: Cart) => {
        const updatedCartItems = _.cloneDeep(prevCart.items);
        const filteredCartItems = updatedCartItems.filter(
          (item) => item.id !== itemId
        );
        const updatedCart = { ...prevCart, items: filteredCartItems };
        saveCartToLocalStorage(updatedCart);
        return updatedCart;
      });
    }
  };

  const incrementCartElement = async (id: string) => {
    const existingItemIndex = cart.items.findIndex((item) => item.id === id);

    if (existingItemIndex !== -1) {
      setCart((prevCart: Cart) => {
        const updatedCartItems = _.cloneDeep(prevCart.items);
        updatedCartItems[existingItemIndex].amount += 1;
        const updatedCart = { ...prevCart, items: updatedCartItems };
        saveCartToLocalStorage(updatedCart);
        updateCart();
        return updatedCart;
      });
    }
  };

  const decreaseCartElement = (id: string): void => {
    const existingItemIndex = cart.items.findIndex((item) => item.id === id);

    if (existingItemIndex !== -1) {
      setCart((prevCart: Cart) => {
        const updatedCartItems = _.cloneDeep(prevCart.items);

        if (updatedCartItems[existingItemIndex].amount === 1) {
          updatedCartItems.splice(existingItemIndex, 1);
          deleteCartItem(id);
        } else {
          updatedCartItems[existingItemIndex].amount -= 1;
        }

        const updatedCart = { ...prevCart, items: updatedCartItems };
        saveCartToLocalStorage(updatedCart);
        setCart(updatedCart);
        updateCart();
        return updatedCart;
      });
    }
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
        // deleteCartFromLocalStorage,
        getCartFromLocalStorage,
        removeCartFromLocalStorage,
        updateCart,
        saveCartToLocalStorage,
        deleteCartItem,
        clearCart,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;

// await axios.post("carts/create-cart", {
//   user: _id,
//   items: modifiedCartItems,
// });
