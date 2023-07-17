import Card from "../../utils/Card";

import "./RecommendedItem.css";

import lemonPie from "../../../static/products/pies/lemon-pie.jpg";

const RecommendedItem = () => {
  return (
    <Card>
      <div className="recommended-item">
        <div className="recommended-item__image">
          <img src={lemonPie} />
        </div>
        <div className="recommended-item__text">
          <h2>Lemon Pie</h2>
          <div className="recommended-item__text-body">
            <div className="recommended-item__description">
              Indulge in our zesty lemon pie! With a buttery, flaky crust and
              velvety smooth lemon filling, it's a burst of tangy freshness in
              every bite. A slice of that citrusy bliss will definitely leave
              you craving for more!
            </div>
            <div className="recommended-item__actions">
              <div className="actions_plus">+1</div>
              <div className="actions_add">Add to Cart</div>
              <div className="actions_price">€20.99</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecommendedItem;
