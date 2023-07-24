import { useContext } from "react";
import { Link } from "react-router-dom";

import ProductsContext from "../../context/products-context";

import Card from "../shared/Card";
import CartElement from "./CartElement";

import "./CartReview.css";

const CartReview = () => {
  const { cart } = useContext(ProductsContext);

  const cartItems = cart.items.map((item) => (
    <CartElement
      key={item.id}
      id={item.id}
      name={item.name}
      amount={item.amount}
    />
  ));

  return (
    <Card>
      <div className="cart">
        {cart.items.length !== 0 && (
          <>
            <h2>Your Cart</h2>
            <ul className="cart-products-list">{cartItems}</ul>
            <div className="total">
              <p>Total: €99.67</p>
            </div>
            <div>
              <Link to="/cart-final">
                <button className="cart-button">Shipping & Payment</button>
              </Link>
            </div>
          </>
        )}
        {cart.items.length === 0 && (
          <>
            <p className="cart-empty">Your cart is empty!</p>
            <Link to="/home">
              <button className="cart-button">Go shopping</button>
            </Link>
          </>
        )}
      </div>
    </Card>
  );
};

export default CartReview;
