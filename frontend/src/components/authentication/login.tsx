import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoginContext from "../../context/login-context";
import ProductsContext from "../../context/products-context";
import { CartItem } from "../../context/products-context";
import axios from "../../axiosInstance";

import "./login.css";

const LogIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState(undefined);
  const { setLoggedIn, setUserId } = useContext(LoginContext);
  const {
    getCartFromLocalStorage,
    saveCartToLocalStorage,
    cart,
    setCart,
    updateCart,
  } = useContext(ProductsContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const searchParams = new URLSearchParams(location.search);
  const newUser = searchParams.get("newUser");
  const navigateToSummary = searchParams.get("navigateToSummary");

  const onSubmit = async (formData: any) => {
    try {
      const response = await axios.post("login", {
        email: formData.email,
        password: formData.password,
      });

      const { name, _id } = response.data.user;
      setLoggedIn(name);
      setUserId(_id);

      let cartFromLocalStorage: any = getCartFromLocalStorage();
      let mergedCart: CartItem[] = [];
      let itemsFromServer;
      const itemsFromLocalStorage = cartFromLocalStorage.items;
      try {
        const response = await axios.get(`carts/${_id}`);
        const cartItems = response.data.cart.cartProducts;
        let fetchedItems = cartItems.map((item: any) => ({
          id: item._id,
          name: item.name,
          price: item.price,
          amount: item.amount,
        }));
        itemsFromServer = fetchedItems;

        if (itemsFromLocalStorage.length > 0) {
          const concatenatedItems = itemsFromServer.concat(
            itemsFromLocalStorage
          );
          let mergedItems: { [id: string]: any } = {};
          for (const item of concatenatedItems) {
            const existingItem = mergedItems[item.id];

            if (existingItem) {
              existingItem.amount += item.amount;
            } else {
              mergedItems[item.id] = { ...item };
            }
          }
          mergedCart = Object.values(mergedItems);

          saveCartToLocalStorage({ items: mergedCart });
          setCart({ items: mergedCart });
          updateCart();
        } else {
          setCart({ items: itemsFromServer });
        }
      } catch (err: any) {
        console.log(err);
      }

      if (navigateToSummary === "true") {
        navigate("/final");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      setServerError(err.response.data.message);
    }
  };

  return (
    <div className="container">
      <h2>Log in</h2>
      {newUser === "true" && (
        <p className="registration-complete__message">
          Registration successful!
        </p>
      )}
      <div>
        <form className="address-form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            E-Mail:
            <input
              {...register("email", {
                required: "This is required.",
                validate: {
                  matchPattern: (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "Please enter a valid e-mail address.",
                },
              })}
              type="text"
              name="email"
            />
          </label>
          <p className="form-message__error">
            {errors.email?.message?.toString()}
          </p>
          <label>
            Password:
            <input
              {...register("password", {
                required: "This is required.",
              })}
              type="password"
            />
          </label>
          <p className="form-message__error">
            {errors.password?.message?.toString()}
          </p>
          {serverError && <p className="form-message__error">{serverError}</p>}
          <button type="submit" className="button">
            Log in
          </button>
        </form>
      </div>
      <div className="actions-container">
        <div className="switch">
          <p className="switch-text">
            No account?{" "}
            <span>
              <Link to="/signup" className="switch-text__link">
                Sign up instead!
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
