import { Link } from "react-router-dom";

import Card from "../shared/Card";

import "./CartFinal.css";

const CartFinal = () => {
  return (
    <Card>
      <div className="cart">
        <h2>Shipping & Payment</h2>
        <div>
          <h3>Adress</h3>
          <form className="address-form">
            <label>
              First Name:
              <input type="text" name="name" />
            </label>
            <label>
              Last Name:
              <input type="text" name="name" />
            </label>
            <label>
              Street & Number:
              <input type="text" name="name" />
            </label>
            <label>
              City:
              <input type="text" name="name" />
            </label>
            <label>
              Postal Code:
              <input type="text" name="name" />
            </label>
          </form>
        </div>
        {/* <div>
          <h3>Payment</h3>
        </div> */}
        <div className="total">
          <p>Total Price: €95.94</p>
        </div>
        <div className="cart-buttons">
          <Link to="/cart-review">
            <button className="cart-button go-back">Back to Cart</button>
          </Link>
          <Link to="/order-placed">
            <button className="cart-button buy">Place Order</button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CartFinal;
