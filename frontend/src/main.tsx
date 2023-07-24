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
import Login from "./components/login/login.tsx";
import Signup from "./components/login/signup.tsx";
import LoginContextProvider from "./LoginContextProvider.tsx";
import ProductsContextProvider from "./ProductsContextProvider.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Recommended />,
      },
      { path: "/products/:categoryName", element: <Products /> },
      { path: "/cart-review", element: <CartReview /> },
      { path: "/cart-final", element: <CartFinal /> },
      { path: "/order-placed", element: <OrderPlaced /> },
      { path: "/add-product", element: <AddProduct /> },
      { path: "/edit-product", element: <EditProduct /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
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
