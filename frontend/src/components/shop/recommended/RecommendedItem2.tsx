import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "./RecommendedItem.css";

import lemonPie from "../../../static/products/pies/lemon-pie.jpg";

const RecommendedItem2 = () => {
  return (
    <div className="product-item">
      <div className="product-item__image">
        <img src={lemonPie} />
      </div>
      <div className="product-item__text">
        <h2>Lemon Pie</h2>
        <p>€20.99</p>
        <div className="product-item__text-body">
          <div className="product-item__description">
            Tangy perfection awaits in every bite of our zesty lemon pie! A
            golden, flaky crust embraces a luscious lemon filling that strikes
            the perfect balance of sweetness and citrus.
          </div>
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

export default RecommendedItem2;
