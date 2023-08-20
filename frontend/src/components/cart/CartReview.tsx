import { useContext } from "react";
import { Link } from "react-router-dom";
import ProductsContext from "../../context/products-context";
import LoginContext from "../../context/login-context";
import CartElement from "./CartElement";

import "./CartReview.css";

const CartReview = () => {
  const { cart } = useContext(ProductsContext);
  const { loggedIn } = useContext(LoginContext);

  const cartItems = cart.items.map((item) => (
    <CartElement
      key={item.id}
      id={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
    />
  ));

  const totalPurchasePrice = cart.items.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );

  return (
    <div className="container">
      {cart.items.length !== 0 && (
        <>
          <h2>Your Cart</h2>
          <ul className="cart-products-list">{cartItems}</ul>
          <div className="total">
            <p>
              Total:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "EUR",
              }).format(totalPurchasePrice)}
            </p>
          </div>
          <div className="cart-review__buttons">
            {loggedIn && (
              <Link to="/final">
                <button className="button next">Shipping & Payment</button>
              </Link>
            )}
            {!loggedIn && (
              <Link to="/login">
                <button className="button next">Log In</button>
              </Link>
            )}
          </div>
        </>
      )}
      {cart.items.length === 0 && (
        <>
          <p className="cart-empty">Your cart is empty!</p>
          <Link to="/">
            <button className="button">Go shopping</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default CartReview;
