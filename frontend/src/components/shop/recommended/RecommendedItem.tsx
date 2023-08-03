import { useContext } from "react";
import { Link } from "react-router-dom";
import LoginContext from "../../../context/login-context";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./RecommendedItem.css";

const RecommendedItem = (props: any) => {
  const { name, description, photoUrl, price, id } = props;
  const { loggedIn } = useContext(LoginContext);

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
            <p className="increase">−</p>
            <div className="actions_padded">1</div>
            <p className="increase">+</p>
            <div className="actions_add">Add to Cart</div>
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
