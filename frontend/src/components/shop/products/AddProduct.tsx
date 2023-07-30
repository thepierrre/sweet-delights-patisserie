import axios from "../../../axiosInstance";
import useForm from "../../../hooks/form-hook";
import Checkbox from "@mui/material/Checkbox";
import Card from "../../shared/Card";
import "./AddProduct.css";

const AddProduct = () => {
  const {
    formValues,
    handleInputChange,
    isFormValid,
    isFormSubmitted,
    setIsFormSubmitted,
  } = useForm({
    name: "",
    price: undefined,
    description: "",
    category: "",
    photoUrl: "",
    isRecommended: false,
  });

  const addProductHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsFormSubmitted(true);

    if (isFormValid) {
      try {
        const product = await axios.post("products", {
          name: formValues.name,
          price: formValues.price,
          description: formValues.description,
          category: formValues.category,
          photoUrl: formValues.photoUrl,
          isRecommended: formValues.isRecommended,
        });
        console.log(product);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Card>
      <div className="cart">
        <h2>Add a New Product</h2>
        <form className="product-form" onSubmit={addProductHandler}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              maxLength={30}
              value={formValues.name}
              onChange={handleInputChange}
              className="form-input"
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              className="form-input"
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
              className="form-input"
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
          <label>
            Recommended?
            <Checkbox
              name="isRecommended"
              checked={formValues.isRecommended}
              onChange={handleInputChange}
            ></Checkbox>
          </label>
          <div className="form-message">
            {isFormSubmitted && !isFormValid && (
              <p className="form-message__error">
                Please fill in all the fields!
              </p>
            )}
            {isFormSubmitted && isFormValid && (
              <p className="form-message__success">Added a new product!</p>
            )}
          </div>
          <button className="cart-button" type="submit">
            Add Product
          </button>
        </form>
      </div>
    </Card>
  );
};

export default AddProduct;
