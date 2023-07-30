import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import useForm from "../../hooks/form-hook";
import LoginContext from "../../context/login-context";
import Card from "../shared/Card";
import axios from "../../axiosInstance";

import "./login.css";

const LogIn = () => {
  const { setLoggedIn } = useContext(LoginContext);
  const {
    formValues,
    handleInputChange,
    isFormValid,
    isFormSubmitted,
    setIsFormSubmitted,
  } = useForm({
    email: "",
    password: "",
  });

  const logInUser = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsFormSubmitted(true);

    if (isFormValid) {
      try {
        const response = await axios.post("login", {
          email: formValues.email,
          password: formValues.password,
        });

        const { name } = response.data.user;
        console.log(`Logged in as ${name}!`);
        setLoggedIn(name);
      } catch (err) {
        console.log(err.response.data.message);
      }
    }
  };

  return (
    <Card>
      <div className="cart">
        <h2>Log in</h2>
        <div>
          <form className="address-form" onSubmit={logInUser}>
            <label>
              E-Mail:
              <input
                type="text"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Password:
              <input
                type="text"
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
              />
            </label>
            <div className="form-message">
              {isFormSubmitted && !isFormValid && (
                <p className="form-message__error">
                  Please fill in all the fields!
                </p>
              )}
            </div>
            <button type="submit" className="cart-button">
              Log in
            </button>
          </form>
        </div>
        <div className="cart-actions">
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
    </Card>
  );
};

export default LogIn;
