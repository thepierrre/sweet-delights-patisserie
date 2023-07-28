import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../axiosInstance";
import useForm from "../../../hooks/form-hook";
import Card from "../../shared/Card";

import "./EditProduct.css";

const EditProduct = () => {
  const { productId } = useParams();

  const {
    formValues,
    setFormValues,
    formValidity,
    handleInputChange,
    isFormValid,
  } = useForm({
    name: "",
    price: "",
    description: "",
    category: "",
    photoUrl: "",
  });

  useEffect(() => {
    const fetchProductToEditHandler = async () => {
      try {
        const res = await axios.get(`products/product/${productId}`);
        const productData = res.data.product;
        const categoryName = res.data.category;

        setFormValues({
          name: productData.name,
          price: productData.price,
          description: productData.description,
          category: categoryName,
          photoUrl: productData.photoUrl,
        });
      } catch (err) {}
    };

    fetchProductToEditHandler();
  }, [productId]);

  const editProductHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isFormValid) {
      try {
        await axios.patch(`products/${productId}`, {
          name: formValues.name,
          price: formValues.price,
          description: formValues.description,
          category: formValues.category,
          photoUrl: formValues.photoUrl,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Card>
      <div className="cart">
        <h2>Edit the Product</h2>
        <form className="product-form" onSubmit={editProductHandler}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              maxLength={30}
              value={formValues.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              step={0.01}
              name="price"
              value={formValues.price}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Category:
            <br />
            <select
              name="category"
              className="category"
              value={formValues.category}
              onChange={handleInputChange}
            >
              <option value="Cupcakes">Cupcakes</option>
              <option value="Cakes">Cakes</option>
              <option value="Pies">Pies</option>
              <option value="Donuts">Donuts</option>
            </select>
          </label>
          <label>
            Photo URL:
            <input
              type="text"
              name="photoUrl"
              value={formValues.photoUrl}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              maxLength={200}
              className="input-description"
              value={formValues.description}
              onChange={handleInputChange}
            />
          </label>
          <button className="cart-button" type="submit">
            Save Changes
          </button>
        </form>
      </div>
    </Card>
  );
};

export default EditProduct;
