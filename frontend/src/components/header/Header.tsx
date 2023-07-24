import { useContext } from "react";
import { NavLink } from "react-router-dom";

import LoginContext from "../../context/login-context";
import "./Header.css";
import mainLogo from "../../static/main-logo.png";

const Header = () => {
  const { loggedIn } = useContext(LoginContext);
  return (
    <header className="header">
      <div className="upper-header">
        <div className="main-logo">
          <div className="main-logo__picture">
            <img src={mainLogo} />
          </div>
          <div className="main-logo__text">
            <h1>Sweet Delights</h1>
            <h2>— Est. 1954 —</h2>
          </div>
          <div className="main-logo__picture">
            <img src={mainLogo} />
          </div>
        </div>
        <div className="login-info">
          <p>Logged in as {loggedIn}</p>
        </div>
      </div>
      <nav className="main-nav">
        <ul>
          <NavLink to="/home" className="main-nav__element">
            <li>Home</li>
          </NavLink>
          <NavLink to="/about" className="main-nav__element">
            <li>About</li>
          </NavLink>
          <NavLink to="/login" className="main-nav__element">
            <li>Log In</li>
          </NavLink>
          <NavLink to="/cart-review" className="main-nav__element">
            <li>Cart</li>
          </NavLink>
          <NavLink to="/add-product" className="main-nav__element">
            <li>Add Product</li>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
