import axios from "../../../axiosInstance";
import { useContext, useState } from "react";
import LoginContext from "../../../context/login-context";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import "./ProductItem.css";
import ProductsContext from "../../../context/products-context";
import cartImg from "../../../../public/cart-image.gif";

const ProductItem = (props: any) => {
  const [amountToAdd, setAmountToAdd] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useContext(ProductsContext);
  const { loggedIn } = useContext(LoginContext);
  const { id, name, description, photoUrl, price, fetchProducts } = props;

  const increaseAmountToAdd = () => {
    if (amountToAdd < 99) {
      // setAmountToAdd((prevAmount) => prevAmount + 1);
      setAmountToAdd(amountToAdd + 1);
    }
    return;
  };

  const decreaseAmountToAdd = () => {
    if (amountToAdd > 1) {
      // setAmountToAdd((prevAmount) => prevAmount - 1);
      setAmountToAdd(amountToAdd - 1);
    }
    return;
  };

  const onAddToCart = (
    id: string,
    name: string,
    price: number,
    amount: number
  ) => {
    addToCart(id, name, price, amount);
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 1000);
  };

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`products/${id}`);
      await fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="product-item">
      <div className="product-item__image">
        <img src={photoUrl} />
      </div>
      <div className="product-item__text">
        <h2>{name}</h2>
        <p>€{price}</p>
        <div className="product-item__text-body">
          <div className="product-item__description">{description}</div>
          <div className="product-item__actions">
            <p className="increase-decrease" onClick={decreaseAmountToAdd}>
              −
            </p>
            <div className="actions_padded">{amountToAdd}</div>
            <p className="increase-decrease" onClick={increaseAmountToAdd}>
              +
            </p>
            <div
              className="actions_add"
              onClick={() => onAddToCart(id, name, price, amountToAdd)}
            >
              Add to Cart
            </div>
            <div className="tick-container">
              {addedToCart && (
                <img className="cart-animation" src={cartImg} alt="cart icon" />
              )}
            </div>
            {loggedIn === "admin" && (
              <>
                <Link to={`/edit-product/${id}`} className="actions_padded">
                  <EditIcon fontSize="small" />
                </Link>
                <div className="actions_padded" onClick={handleDeleteProduct}>
                  <DeleteIcon fontSize="small" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
