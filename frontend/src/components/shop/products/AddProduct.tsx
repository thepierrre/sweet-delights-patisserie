import Card from "../../shared/Card";

import "./AddProduct.css";

const AddProduct = () => {
  return (
    <Card>
      <div className="cart">
        <h2>Add a New Product</h2>
        <form className="product-form">
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <label>
            Price:
            <input type="text" name="price" />
          </label>
          <label>
            Category:
            <input type="text" name="category" list="categories" />
            <datalist id="categories">
              <option value="Cupcakes" />
              <option value="Cakes" />
              <option value="Pies" />
              <option value="Donuts" />
              <option value="Candy" />
            </datalist>
          </label>
          <label>
            Photo Link:
            <input type="text" name="photo" />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              className="input-description"
            />
          </label>
        </form>
        <button className="cart-button">Add Product</button>
      </div>
    </Card>
  );
};

export default AddProduct;
