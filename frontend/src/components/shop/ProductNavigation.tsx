import { Link } from "react-router-dom";

import "./ProductNavigation.css";

import cupcake from "../../static/product-categories/cupcake.png";
import cake from "../../static/product-categories/cake.png";
import pie from "../../static/product-categories/pie.png";
import donut from "../../static/product-categories/donut.png";

const ProductNavigation = () => {
  return (
    <>
      <div className="product-nav">
        <Link to="products/Cupcakes" className="product-cat">
          <div className="product-cat__logo">
            <img src={cupcake} />
          </div>
          <p>Cupcakes</p>
        </Link>
        <Link to="products/Cakes" className="product-cat">
          <div className="product-cat__logo">
            <img src={cake} />
          </div>
          <p>Cakes</p>
        </Link>
        <Link to="products/Pies" className="product-cat">
          <div className="product-cat__logo">
            <img src={pie} />
          </div>
          <p>Pies</p>
        </Link>
        <Link to="products/Donuts" className="product-cat">
          <div className="product-cat__logo">
            <img src={donut} />
          </div>
          <p>Donuts</p>
        </Link>
        {/* <Link to="products/Candy" className="product-cat">
          <div className="product-cat__logo">
            <img src={candy} />
          </div>
          <p>Candy</p>
        </Link> */}
      </div>
    </>
  );
};

export default ProductNavigation;
