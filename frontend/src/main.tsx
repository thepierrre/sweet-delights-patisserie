// @ts-nocheck

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import Recommended from "./components/shop/recommended/Recommended.tsx";
import Products from "./components/shop/products/Products.tsx";
import CartReview from "./components/cart/CartReview.tsx";
import CartFinal from "./components/cart/CartFinal.tsx";
import OrderPlaced from "./components/cart/OrderPlaced.tsx";
import AddProduct from "./components/shop/products/AddProduct.tsx";
import EditProduct from "./components/shop/products/EditProduct.tsx";
import Login from "./components/authentication/login.tsx";
import Signup from "./components/authentication/signup.tsx";
import About from "./components/about/About.tsx";
import Credits from "./components/authorship/Credits.tsx";
import LoginContextProvider from "./context-providers/LoginContextProvider.tsx";
import ProductsContextProvider from "./context-providers/ProductsContextProvider.js";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // {
      //   path: "/home",
      //   element: <Recommended />,
      // },
      { path: "/about", element: <About /> },
      { path: "/products/:categoryName", element: <Products /> },
      { path: "/cart-review", element: <CartReview /> },
      { path: "/final", element: <CartFinal /> },
      { path: "/order-placed", element: <OrderPlaced /> },
      { path: "/add-product", element: <AddProduct /> },
      { path: "/edit-product/:productId", element: <EditProduct /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/credits", element: <Credits /> },
      { index: true, element: <Recommended /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoginContextProvider>
      <ProductsContextProvider>
        <RouterProvider router={router} />
      </ProductsContextProvider>
    </LoginContextProvider>
  </React.StrictMode>
);
