import axios from "axios";
import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ProductsContext from "../../../context/products-context";
import ProductItem from "./ProductItem";

import "./Products.css";

const Products = () => {
  const { products, setProducts } = useContext(ProductsContext);
  const { categoryName } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5003/api/products/${categoryName}`
        );

        let response = res.data.categoryWithProducts.products;
        setProducts(response);
        console.log(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [categoryName]);

  const productItems = products.map((product) => (
    <ProductItem
      id={product["_id"]}
      key={product["_id"]}
      name={product["name"]}
      description={product["description"]}
      photoUrl={product["photoUrl"]}
      price={product["price"]}
    />
  ));

  return <div className="products">{productItems}</div>;
};

export default Products;
