import axios from "../../axiosInstance";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Card from "../shared/Card";

import "./signup.css";
import React from "react";

const SignUp = () => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsFormSubmitted(true);

    if (formValues.name === "admin") {
      setShowErrorMessage(true);
      return; // Stop the form submission
    }

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
          <form className="address-form" onSubmit={handleSubmit(onSubmit)}>
            <label>
              Name:
              <input
                {...register("name", {
                  required: "This is required.",
                })}
                type="text"
              />
            </label>
            <p className="form-message__error">
              {errors.name?.message?.toString()}
            </p>
            <label>
              E-Mail:
              <input
                {...register("email", {
                  required: "This is required.",
                })}
                type="text"
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
