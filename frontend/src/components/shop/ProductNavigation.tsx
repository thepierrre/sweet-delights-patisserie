import "./ProductNavigation.css";

import cupcake from "../../static/product-categories/cupcake.png";
import cake from "../../static/product-categories/cake.png";
import pie from "../../static/product-categories/pie.png";
import donut from "../../static/product-categories/donut.png";
import candy from "../../static/product-categories/candy.png";

const ProductNavigation = () => {
  return (
    <>
      <div className="product-nav">
        <div className="product-cat">
          <div className="product-cat__logo">
            <img src={cupcake} />
          </div>
          <p>Cupcakes</p>
        </div>
        <div className="product-cat">
          <div className="product-cat__logo">
            <img src={cake} />
          </div>
          <p>Cakes</p>
        </div>
        <div className="product-cat">
          <div className="product-cat__logo">
            <img src={pie} />
          </div>
          <p>Pies</p>
        </div>
        <div className="product-cat">
          <div className="product-cat__logo">
            <img src={donut} />
          </div>
          <p>Donuts</p>
        </div>
        <div className="product-cat">
          <div className="product-cat__logo">
            <img src={candy} />
          </div>
          <p>Candy</p>
        </div>
      </div>
    </>
  );
};

export default ProductNavigation;
