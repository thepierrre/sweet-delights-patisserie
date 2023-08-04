import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ProductsContext from "../../../context/products-context";
import ProductItem from "./ProductItem";
import axios from "../../../axiosInstance";

import "./Products.css";

const Products = () => {
  const { products, setProducts } = useContext(ProductsContext);
  const { categoryName } = useParams();

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`products/category/${categoryName}`);
      let response = res.data.categoryWithProducts.products;
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
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
      isRecommended={product["isRecommended"]}
      fetchProducts={fetchProducts}
    />
  ));

  return <div className="products">{productItems}</div>;
};

export default Products;
