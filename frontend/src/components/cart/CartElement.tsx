import { useContext } from "react";
import { CartItem } from "../../context/products-context";
import ProductsContext from "../../context/products-context";

import "./CartElement.css";

const CartElement: React.FC<CartItem> = (props: any) => {
  const { incrementCartElement, decreaseCartElement } =
    useContext(ProductsContext);

  const { id, name, amount, price } = props;

  const totalItemPrice = price * amount;

  return (
    <li className="cart-product-item">
      <div className="cart-item__amount">
        <p
          className="increase-decrease"
          onClick={() => decreaseCartElement(id)}
        >
          −
        </p>
        <p className="number">{amount}</p>
        <p
          className="increase-decrease"
          onClick={() => incrementCartElement(id)}
        >
          +
        </p>
      </div>
      <p className="cart-product-item__name">{name}</p>
      <p className="cart-product-item__price">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "EUR",
        }).format(totalItemPrice)}
      </p>
    </li>
  );
};

export default CartElement;
