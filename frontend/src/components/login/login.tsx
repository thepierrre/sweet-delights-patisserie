import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoginContext from "../../context/login-context";
import Card from "../shared/Card";
import axios from "../../axiosInstance";

import "./login.css";

const LogIn = () => {
  const navigate = useNavigate();
  const [invalidCredentials, setInvalidCredentials] = useState(undefined);
  const { setLoggedIn } = useContext(LoginContext);

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
      const { name } = response.data.user;
      setLoggedIn(name);
      navigate("/home");
    } catch (err: any) {
      setInvalidCredentials(err.response.data.message);
    }
  };

  return (
    <Card>
      <div className="cart">
        <h2>Log in</h2>
        <div>
          <form className="address-form" onSubmit={handleSubmit(onSubmit)}>
            <label>
              E-Mail:
              <input
                {...register("email", {
                  required: "This is required.",
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
