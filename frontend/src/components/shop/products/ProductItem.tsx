import { useContext } from "react";

import Card from "../../shared/Card";

import "./ProductItem.css";

import ProductsContext from "../../../context/products-context";

const ProductItem = (props: any) => {
  const { id, name, description, photoUrl, price } = props;
  const { addToCart } = useContext(ProductsContext);

  // const addToCart = () => {
  //   const newItem: CartItem = { id, name };
  //   setCart((prevCart: Cart) => ({
  //     ...prevCart,
  //     items: [...prevCart.items, newItem],
  //   }));
  //   console.log(cart);
  // };

  const onAddToCart = (id: string, name: string) => {
    addToCart(id, name);
  };

  return (
    <Card>
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
              <div className="actions_plus">1</div>
              <p className="increase">+</p>
              <div
                className="actions_add"
                onClick={() => onAddToCart(id, name)}
              >
                Add to Cart
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductItem;
