import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductsContext from "../../context/products-context";
import LoginContext from "../../context/login-context";
import CartElement from "./CartElement";

import "./CartReview.css";

const CartReview = () => {
  const { cart, setCart } = useContext(ProductsContext);
  const { loggedIn } = useContext(LoginContext);

  useEffect(() => {
    const cartFromLocalStorage = getCartFromLocalStorage();
    setCart(cartFromLocalStorage);
    console.log(cart);
  }, []);

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
    (total, item) => total + item.price,
    0
  );

  const getCartFromLocalStorage = () => {
    const cartJSON = localStorage.getItem("cart");
    if (cartJSON) {
      return JSON.parse(cartJSON);
    } else {
      return { items: [] }; // Return an empty cart if it's not found in localStorage
    }
  };

  return (
    <div className="container">
      {cart.items.length !== 0 && (
        <>
          <h2>Your Cart</h2>
          <ul className="cart-products-list">{cartItems}</ul>
          <div className="total">
            <p>Total: €{totalPurchasePrice}</p>
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
