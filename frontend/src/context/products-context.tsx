import { Dispatch, SetStateAction, createContext } from "react";

export interface Product {
  _id: string;
  name: string;
  description: string;
  photoUrl: string;
  price: number;
}

export interface CartItem {
  id: string;
  name: string;
  amount: number;
}

export interface Cart {
  items: CartItem[];
}

interface ProductsContextType {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  cart: Cart;
  setCart: Dispatch<SetStateAction<Cart>>;
  addToCart: (id: string, name: string) => void;
  incrementCartElement: (id: string) => void;
}

const ProductsContext = createContext<ProductsContextType>(
  {} as ProductsContextType
);

export default ProductsContext;
