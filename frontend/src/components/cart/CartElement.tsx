import { useContext } from "react";
import { CartItem } from "../../context/products-context";
import ProductsContext from "../../context/products-context";
import { ThemeProvider } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import theme from "./CartElementButtonTheme";
import ClearIcon from "@mui/icons-material/Clear";

import "./CartElement.css";

const CartElement: React.FC<CartItem> = (props: any) => {
  const { incrementCartElement, decreaseCartElement, deleteCartElement } =
    useContext(ProductsContext);

  const { id, name, amount, price } = props;

  const totalItemPrice = price * amount;

  return (
    <ThemeProvider theme={theme}>
      <li className="cart-product-item">
        <div className="cart-item__amount">
          <div
            className="increase-decrease"
            onClick={() => decreaseCartElement(id)}
          >
            −
          </div>
          <div className="number">{amount}</div>
          <div
            className="increase-decrease"
            onClick={() => incrementCartElement(id)}
          >
            +
          </div>
        </div>
        <div className="cart-product-item__name">{name}</div>
        <div className="cart-product-item__price">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "EUR",
          }).format(totalItemPrice)}
        </div>
        <div className="cart-product-item__remove">
          <IconButton
            style={{ backgroundColor: "transparent" }}
            sx={{
              ":hover": {
                transition: "transform 0.1s ease-in-out",
                transform: "scale(1.2)",
              },
            }}
            onClick={() => deleteCartElement(id)}
          >
            <ClearIcon color="primary" fontSize="small" />
          </IconButton>
        </div>
      </li>
    </ThemeProvider>
  );
};

export default CartElement;
