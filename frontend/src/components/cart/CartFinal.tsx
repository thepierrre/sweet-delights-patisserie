import { useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProductsContext from "../../context/products-context";

import "./CartFinal.css";

const CartFinal = () => {
  const { setPurchaseInfo } = useContext(ProductsContext);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const onSubmit = (formData: any) => {
    setPurchaseInfo({
      firstName: formData.firstName,
      lastName: formData.lastName,
      street: formData.street,
      city: formData.city,
      postalCode: formData.postalCode,
      paymentOption: formData.paymentOption,
    });
  };

  const handleInputChange = (event: any) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setPurchaseInfo((prevPurchaseInfo) => ({
      ...prevPurchaseInfo,
      [fieldName]: fieldValue,
    }));
  };

  return (
    <div className="container">
      <h2>Shipping & Payment</h2>
      <form
        className="address-form"
        id="address-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3>Adress</h3>
        <label>
          First Name:
          <input
            {...register("firstName", {
              required: "This is required.",
            })}
            type="text"
            onInput={handleInputChange}
          />
        </label>
        <label>
          Last Name:
          <input
            {...register("lastName", {
              required: "This is required.",
            })}
            type="text"
            onInput={handleInputChange}
          />
        </label>
        <label>
          Street & Number:
          <input
            {...register("street", {
              required: "This is required.",
            })}
            type="text"
            onInput={handleInputChange}
          />
        </label>
        <label>
          City:
          <input
            {...register("city", {
              required: "This is required.",
            })}
            type="text"
            name="city"
            onInput={handleInputChange}
          />
        </label>
        <label>
          Postal Code:
          <input
            {...register("postalCode", {
              required: "This is required.",
            })}
            type="text"
            onInput={handleInputChange}
          />
        </label>
        <h3 className="payment">Payment</h3>
        <label>
          Choose Option:
          <br />
          <select
            {...register("paymentOption", {
              required: "This is required.",
            })}
            className="payment-menu"
            defaultValue="cash"
            onInput={handleInputChange}
          >
            <option value="cash">Cash On Delivery</option>
            <option value="transfer">Bank Transfer</option>
          </select>
        </label>
      </form>
      <div className="total">
        <p>Total Price: €95.94</p>
      </div>
      <div className="buttons">
        <Link to="/cart-review">
          <button className="button go-back">Back to Cart</button>
        </Link>
        <Link to="/order-placed">
          <button
            className="button buy"
            form="address-form"
            type="submit"
            disabled={!isValid}
          >
            Place Order
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartFinal;
