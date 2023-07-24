import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "../../shared/Card";

import "./RecommendedItem.css";

import lemonPie from "../../../static/products/pies/lemon-pie.jpg";

const RecommendedItem = () => {
  return (
    <Card>
      <div className="product-item">
        <div className="product-item__image">
          <img src={lemonPie} />
        </div>
        <div className="product-item__text">
          <h2>Lemon Pie</h2>
          <p>€20.99</p>
          <div className="product-item__text-body">
            <div className="product-item__description">
              Indulge in our zesty lemon pie! With a buttery, flaky crust and
              velvety smooth lemon filling, it's a burst of tangy freshness in
              every bite. A slice of that citrusy bliss will definitely leave
              you craving for more!
            </div>
            <div className="product-item__actions">
              <div className="actions_plus">+1</div>
              <div className="actions_add">Add to Cart</div>
              <div className="actions_plus">
                <EditIcon fontSize="small" />
              </div>
              <div className="actions_plus">
                <DeleteIcon fontSize="small" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecommendedItem;
