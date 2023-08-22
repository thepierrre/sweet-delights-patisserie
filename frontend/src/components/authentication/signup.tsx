import axios from "../../axiosInstance";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, createSearchParams } from "react-router-dom";
import "./signup.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAdminError, setIsAdminError] = useState(false);
  const [serverError, setServerError] = useState(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData: any) => {
    try {
      if (formData.name.toLowerCase() === "admin") {
        setIsAdminError(true);
        return;
      }
      await axios.post("users", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
      // navigate("/login");
      navigate({
        pathname: "/login",
        search: createSearchParams({
          newUser: "true",
        }).toString(),
      });
    } catch (err: any) {
      setServerError(err.response.data.message);
    }
  };

  return (
    <div className="container">
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
                validate: {
                  matchPattern: (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "Please enter a valid e-mail address.",
                },
              })}
              type="text"
            />
          </label>
          <p className="form-message__error">
            {errors.email?.message?.toString()}
          </p>
          {errors.name?.type === "manual" && (
            <p className="form-message__error">
              {errors.name?.message?.toString()}
            </p>
          )}
          <label>
            Password:
            <input
              {...register("password", {
                required: "This is required.",
                minLength: {
                  value: 6,
                  message: "Please enter minimum 6 characters.",
                },
              })}
              type="password"
            />
          </label>
          <p className="form-message__error">
            {errors.password?.message?.toString()}
          </p>
          {isAdminError && (
            <p className="form-message__error">
              You can't register as an admin!
            </p>
          )}
          {serverError && <p className="form-message__error">{serverError}</p>}
          {isSubmitted && (
            <p className="form-message__success">Registered a user!</p>
          )}
          <button type="submit" className="button">
            Sign up
          </button>
        </form>
      </div>
      <div className="actions-container">
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
  );
};

export default SignUp;
