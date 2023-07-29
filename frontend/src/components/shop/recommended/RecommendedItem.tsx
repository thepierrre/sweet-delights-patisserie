import { SwiperSlide } from "swiper/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./RecommendedItem.css";

const RecommendedItem = (props: any) => {
  const { id, name, description, photoUrl, price } = props;
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
            <p className="increase">−</p>
            <div className="actions_padded">1</div>
            <p className="increase">+</p>
            <div className="actions_add">Add to Cart</div>
            <div className="actions_padded">
              <EditIcon fontSize="small" />
            </div>
            <div className="actions_padded">
              <DeleteIcon fontSize="small" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedItem;
