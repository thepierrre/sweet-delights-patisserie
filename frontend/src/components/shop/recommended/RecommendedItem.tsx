import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import LoginContext from "../../../context/login-context";
import ProductsContext from "../../../context/products-context";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import "./RecommendedItem.css";

const RecommendedItem = (props: any) => {
  const [amountToAdd, setAmountToAdd] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useContext(ProductsContext);
  const { name, description, photoUrl, price, id } = props;
  const { loggedIn } = useContext(LoginContext);

  const increaseAmountToAdd = () => {
    if (amountToAdd < 99) {
      setAmountToAdd(amountToAdd + 1);
    }
    return;
  };

  const decreaseAmountToAdd = () => {
    if (amountToAdd > 1) {
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

  return (
    <div className="product-item recommended-item">
      <div className="product-item__image">
        <img src={photoUrl} />
      </div>
      <div className="product-item__text">
        <h2>{name}</h2>
        <p>€{price}</p>
        <div className="product-item__text-body">
          <div className="recommended-item__description">{description}</div>
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
              {addedToCart && <DoneIcon color="success" fontSize="large" />}
            </div>
            {loggedIn === "admin" && (
              <>
                <Link to={`/edit-product/${id}`} className="actions_padded">
                  <EditIcon fontSize="small" />
                </Link>
                <div className="actions_padded">
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

export default RecommendedItem;
