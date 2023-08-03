import { useContext } from "react";
import { CartItem } from "../../context/products-context";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import ProductsContext from "../../context/products-context";

import "./CartElement.css";

const CartElement: React.FC<CartItem> = (props: any) => {
  const { cart, incrementCartElement, decreaseCartElement } =
    useContext(ProductsContext);

  const { id, name, amount, price } = props;

  const totalItemPrice = price * amount;

  return (
    <li className="cart-product-item">
      <div className="cart-item__amount">
        <p className="increase" onClick={() => decreaseCartElement(id)}>
          −
        </p>
        <p className="number">{amount}</p>
        <p className="increase" onClick={() => incrementCartElement(id)}>
          +
        </p>
      </div>
      <p className="cart-product-item__name">{name}</p>
      <p className="cart-product-item__price">€{totalItemPrice}</p>
    </li>
  );
};

export default CartElement;
