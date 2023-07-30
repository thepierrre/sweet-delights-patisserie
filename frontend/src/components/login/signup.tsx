import axios from "../../axiosInstance";
import { Link } from "react-router-dom";
import useForm from "../../hooks/form-hook";
import Card from "../shared/Card";

import "./signup.css";
import React from "react";

const SignUp = () => {
  const {
    formValues,
    handleInputChange,
    isFormValid,
    isFormSubmitted,
    setIsFormSubmitted,
  } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsFormSubmitted(true);

    if (isFormValid) {
      try {
        await axios.post("users", {
          name: formValues.name,
          email: formValues.email,
          password: formValues.password,
        });
        console.log("registered a user");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Card>
      <div className="cart">
        <h2>Sign up</h2>
        <div>
          <form className="address-form" onSubmit={registerUser}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
              />
            </label>
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
              {isFormSubmitted && isFormValid && (
                <p className="form-message__success">Registered a new user!</p>
              )}
            </div>
            <button type="submit" className="cart-button">
              Sign up
            </button>
          </form>
        </div>
        <div className="cart-actions">
          <div className="switch">
            <p className="switch-text">
              Already a user?{" "}
              <span>
                <Link to="/login" className="switch-text__link">
                  Log in instead!
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SignUp;
