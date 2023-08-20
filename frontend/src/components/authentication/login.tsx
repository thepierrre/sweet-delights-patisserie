import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoginContext from "../../context/login-context";
import ProductsContext from "../../context/products-context";
import axios from "../../axiosInstance";

import "./login.css";

const LogIn = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(undefined);
  const { setLoggedIn } = useContext(LoginContext);
  const { getCartFromLocalStorage, removeCartFromLocalStorage, setCart } =
    useContext(ProductsContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData: any) => {
    try {
      const response = await axios.post("login", {
        email: formData.email,
        password: formData.password,
      });
      const { name, _id } = response.data.user;
      setLoggedIn(name);

      // const cartFromLocalStorage = getCartFromLocalStorage();
      // removeCartFromLocalStorage();
      // await axios.post("carts", {
      //   user: _id,
      //   items: cartFromLocalStorage.items,
      // });

      const cartFromLocalStorage = getCartFromLocalStorage();
      const modifiedCartItems = cartFromLocalStorage.items.map((item) => {
        return {
          _id: item.id, // Rename id to _id
          name: item.name,
          price: item.price,
          amount: item.amount,
        };
      });

      removeCartFromLocalStorage();

      await axios.post("carts", {
        user: _id,
        items: modifiedCartItems, // Use the modified cart items
      });

      navigate("/");
    } catch (err: any) {
      setServerError(err.response.data.message);
    }

    // try {
    //   const response = await axios.get
    // } catch (err: any) {
    //   console.log(err.response.data.message);
    // }
  };

  const handleInputChange = () => {
    if (serverError) {
      setServerError(undefined);
    }
  };

  return (
    <div className="container">
      <h2>Log in</h2>
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
