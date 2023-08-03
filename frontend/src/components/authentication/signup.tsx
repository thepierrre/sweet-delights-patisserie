import axios from "../../axiosInstance";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./signup.css";

const SignUp = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAdminError, setIsAdminError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData: any) => {
    try {
      if (formData.name.toLowerCase() === "admin") {
        // Check if the name is "admin"
        setIsAdminError(true); // Show the admin error message
        setTimeout(() => {
          setIsAdminError(false); // Hide the admin error message after 3 seconds
        }, 3000);
        return; // Return early, don't make the API call
      }

      await axios.post("users", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      setIsSubmitted(true); // Show the success message
      setTimeout(() => {
        setIsSubmitted(false); // Hide the success message after 3 seconds (you can adjust the duration as needed)
      }, 3000);
    } catch (err) {
      console.log(err);
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
