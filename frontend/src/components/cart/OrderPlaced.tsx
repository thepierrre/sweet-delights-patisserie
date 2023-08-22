import { useContext, useEffect } from "react";
import ProductsContext from "../../context/products-context";

import "./OrderPlaced.css";

import packet from "../../static/others/package.png";

const OrderPlaced = () => {
  const { purchaseInfo, setCart } = useContext(ProductsContext);

  useEffect(() => {
    setCart({ items: [] });
  }, []);

  return (
    <div className="container">
      <h2>Order Placed!</h2>
      <div className="order-placed__summary">
        <div className="order-placed__summary address-data">
          <h3>The order will be shipped to:</h3>
          <p>
            {purchaseInfo.firstName} {purchaseInfo.lastName}
          </p>
          <p>{purchaseInfo.street}</p>
          <p>
            {purchaseInfo.postalCode} {purchaseInfo.city}
          </p>
        </div>
        <div className="order-placed__summary payment-info">
          {purchaseInfo.paymentOption === "cash" && (
            <h3>
              The payment will be collected in cash
              <br /> when the order is delivered.
            </h3>
          )}
          {purchaseInfo.paymentOption === "transfer" && (
            <>
              <h3>
                Please transfer the purchase amount
                <br />
                to the following account:
              </h3>
              <p>DE00 123 456 789</p>
            </>
          )}
        </div>
      </div>
      <div className="packet-image">
        <img src={packet} />
      </div>
      <p className="thank-you">Thank you!</p>
    </div>
  );
};

export default OrderPlaced;
