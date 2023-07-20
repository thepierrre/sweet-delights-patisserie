import { Link } from "react-router-dom";

import Card from "../shared/Card";

import "./CartReview.css";

const CartReview = () => {
  return (
    <Card>
      <div className="cart">
        <h2>Your Cart</h2>
        <ul className="cart-products-list">
          <li className="cart-product-item">
            <div className="cart-item__amount">
              <p className="number">1</p>
              <p className="increase">+</p>
            </div>
            <p className="cart-product-item__name">Lemon Pie</p>
            <p className="cart-product-item__price">€20.99</p>
          </li>
          <li className="cart-product-item">
            <div className="cart-item__amount">
              <p className="number">1</p>
              <p className="increase">+</p>
            </div>
            <p className="cart-product-item__name">Lemon Pie</p>
            <p className="cart-product-item__price">€20.99</p>
          </li>
          <li className="cart-product-item">
            <div className="cart-item__amount">
              <p className="number">1</p>
              <p className="increase">+</p>
            </div>
            <p className="cart-product-item__name">Lemon Pie</p>
            <p className="cart-product-item__price">€20.99</p>
          </li>
          <li className="cart-product-item">
            <div className="cart-item__amount">
              <p className="number">1</p>
              <p className="increase">+</p>
            </div>
            <p className="cart-product-item__name">Lemon Pie</p>
            <p className="cart-product-item__price">€20.99</p>
          </li>
        </ul>
        <div className="total">
          <p>Total: €99.67</p>
        </div>
        <div>
          <Link to="/cart-final">
            <button className="cart-button">Shipping & Payment</button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CartReview;
