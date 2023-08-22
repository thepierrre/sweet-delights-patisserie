import { Dispatch, SetStateAction, createContext } from "react";

export interface Product {
  _id: string;
  name: string;
  description: string;
  photoUrl: string;
  price: number;
  isRecommended: boolean;
}

export interface RecommendedProduct {
  _id: string;
  name: string;
  description: string;
  photoUrl: string;
  price: number;
  isRecommended: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  amount: number;
  price: number;
}

export interface Cart {
  items: CartItem[];
}

export interface PurchaseInfo {
  paymentOption: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  postalCode: string;
}

interface ProductsContextType {
  purchaseInfo: PurchaseInfo;
  setPurchaseInfo: Dispatch<SetStateAction<PurchaseInfo>>;
  recommendedProducts: RecommendedProduct[];
  setRecommendedProducts: Dispatch<SetStateAction<RecommendedProduct[]>>;
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  cart: Cart;
  setCart: Dispatch<SetStateAction<Cart>>;
  addToCart: (id: string, name: string, price: number, amount: number) => void;
  incrementCartElement: (id: string) => void;
  decreaseCartElement: (id: string) => void;
  getCartFromLocalStorage: () => Cart;
  removeCartFromLocalStorage: () => void;
  updateCart: () => void;
  saveCartToLocalStorage: (cart: Cart) => void;
  deleteCartItem: (itemId: string) => void;
  clearCart: () => void;
}

const ProductsContext = createContext<ProductsContextType>(
  {} as ProductsContextType
);

export default ProductsContext;
