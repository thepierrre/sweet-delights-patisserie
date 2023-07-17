import Card from "../../utils/Card";

import chocolateCake from "../../../static/products/cakes/chocolate-cake.jpg";

import "./ProductItem.css";

const ProductItem = () => {
  return (
    <Card>
      <div className="product-item">
        <div className="product-item__image">
          <img src={chocolateCake} />
        </div>
        <div className="product-item__text">
          <h3>Chocolate Cake</h3>
          <div className="product-item__text-body">
            <div className="product-item__description"></div>
            <div className="product-item__actions">
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
