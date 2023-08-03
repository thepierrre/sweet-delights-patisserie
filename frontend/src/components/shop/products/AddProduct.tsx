import axios from "../../../axiosInstance";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoginContext from "../../../context/login-context";
import Checkbox from "@mui/material/Checkbox";
import Card from "../../shared/Card";
import "./AddProduct.css";

const AddProduct = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { loggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  const isAdmin = loggedIn === "admin";

  useEffect(() => {
    if (!isAdmin) {
      // Redirect to another page (e.g., login page) if the user is not an admin
      navigate("/login");
    }
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setValue("isRecommended", checked);
  };

  const onSubmit = async (formData: any) => {
    try {
      const product = await axios.post("products", {
        name: formData.name,
        price: formData.price,
        description: formData.description,
        category: formData.category,
        photoUrl: formData.photoUrl,
        isRecommended: formData.isRecommended,
      });
      setShowSuccessMessage(true); // Show the success message
      setTimeout(() => {
        setShowSuccessMessage(false); // Hide the success message after 3 seconds (you can adjust the duration as needed)
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card>
      <div className="cart">
        <h2>Add a New Product</h2>
        <form className="product-form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            Name:
            <input
              {...register("name", {
                required: "This is required.",
              })}
              type="text"
              className="form-input"
            />
          </label>
          <p className="form-message__error">
            {errors.name?.message?.toString()}
          </p>
          <label>
            Price:
            <input
              {...register("price", {
                required: "This is required.",
              })}
              type="number"
              className="form-input"
            />
          </label>
          <p className="form-message__error">
            {errors.price?.message?.toString()}
          </p>
          <label>
            Category:
            <br />
            <select
              {...register("category", {
                required: "This is required.",
              })}
              className="category"
              defaultValue="Cupcakes"
            >
              <option value="Cupcakes">Cupcakes</option>
              <option value="Cakes">Cakes</option>
              <option value="Pies">Pies</option>
              <option value="Donuts">Donuts</option>
            </select>
          </label>
          <p className="form-message__error">
            {errors.category?.message?.toString()}
          </p>
          <label>
            Photo URL:
            <input
              {...register("photoUrl", {
                required: "This is required.",
              })}
              type="text"
              className="form-input"
            />
          </label>
          <p className="form-message__error">
            {errors.photoUrl?.message?.toString()}
          </p>
          <label>
            Description:
            <textarea
              {...register("description", {
                required: "This is required.",
              })}
              className="input-description"
            />
          </label>
          <p className="form-message__error">
            {errors.description?.message?.toString()}
          </p>
          <label>
            Recommended?
            <Checkbox
              {...register("isRecommended", {})}
              onChange={handleCheckboxChange}
            ></Checkbox>
          </label>
          {showSuccessMessage && (
            <p className="form-message__success">Product added!</p>
          )}
          <button className="cart-button" type="submit">
            Add Product
          </button>
        </form>
      </div>
    </Card>
  );
};

export default AddProduct;
