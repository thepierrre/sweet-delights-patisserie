import { useContext } from "react";
import { Link } from "react-router-dom";
import useForm from "../../hooks/form-hook";
import Card from "../shared/Card";
import ProductsContext from "../../context/products-context";

import "./CartFinal.css";

const CartFinal = () => {
  const { purchaseInfo, setPurchaseInfo } = useContext(ProductsContext);

  const {
    formValues,
    handleInputChange,
    isFormValid,
    isFormSubmitted,
    setIsFormSubmitted,
  } = useForm({
    firstName: "",
    lastName: "",
    // totalCost: undefined,
    street: "",
    city: "",
    postalCode: "",
    paymentOption: "",
  });

  const placeOrderHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setIsFormSubmitted(true);

    setPurchaseInfo({
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      totalCost: 30,
      street: formValues.street,
      city: formValues.city,
      postalCode: formValues.postalCode,
      paymentOption: formValues.paymentOption,
    });
    console.log(purchaseInfo);
  };

  return (
    <Card>
      <div className="cart">
        <h2>Shipping & Payment</h2>
        <div>
          <h3>Adress</h3>
          <form
            className="address-form"
            id="address-form"
            onSubmit={placeOrderHandler}
          >
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={formValues.firstName}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={formValues.lastName}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Street & Number:
              <input
                type="text"
                name="street"
                value={formValues.street}
                onChange={handleInputChange}
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={formValues.city}
                // onChange={handleInputChange}
                onChange={(event) => {
                  handleInputChange(event);
                  console.log(purchaseInfo);
                }}
              />
            </label>
            <label>
              Postal Code:
              <input
                type="text"
                name="postalCode"
                value={formValues.postalCode}
                onChange={handleInputChange}
              />
            </label>
            <h3 className="payment">Payment</h3>
            <label>
              Choose Option:
              <br />
              <select
                name="paymentOption"
                className="payment-menu"
                value={formValues.paymentOption}
                onChange={handleInputChange}
              >
                <option value="cash">Cash On Delivery</option>
                <option value="transfer">Bank Transfer</option>
              </select>
            </label>
          </form>
        </div>
        <div className="total">
          <p>Total Price: €95.94</p>
        </div>
        <div className="cart-buttons">
          <div className="form-error">
            {isFormSubmitted && !isFormValid && (
              <p className="form-error-message">
                Please fill in all the fields!
              </p>
            )}
          </div>
          <Link to="/cart-review">
            <button className="cart-button go-back">Back to Cart</button>
          </Link>
          <Link to="/order-placed">
            <button
              className="cart-button buy"
              form="address-form"
              type="submit"
              // disabled={!isFormValid}
            >
              Place Order
            </button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CartFinal;
