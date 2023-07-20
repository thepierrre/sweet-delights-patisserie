import Card from "../../shared/Card";

import chocolateCake from "../../../static/products/cakes/chocolate-cake.jpg";

import "./ProductItem.css";

const ProductItem = (props: any) => {
  const { name, description, photoUrl, price } = props;

  return (
    <Card>
      <div className="recommended-item">
        <div className="recommended-item__image">
          <img src={photoUrl} />
        </div>
        <div className="recommended-item__text">
          <h2>{name}</h2>
          <p>€{price}</p>
          <div className="recommended-item__text-body">
            <div className="recommended-item__description">{description}</div>
            <div className="recommended-item__actions">
              <div className="actions_plus">+1</div>
              <div className="actions_add">Add to Cart</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductItem;
