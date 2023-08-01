import { useContext } from "react";
import { NavLink } from "react-router-dom";
import LoginContext from "../../context/login-context";
import "./Header.css";
import mainLogo from "../../static/main-logo.png";
import axios from "../../axiosInstance";

const Header = () => {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  const handleLogOutUser = () => {
    axios.get("login/logout");
    setLoggedIn("");
  };

  return (
    <header className="header">
      <div className="login-info">
        {loggedIn && (
          <p>
            Logged in as <span>{loggedIn}</span>
          </p>
        )}
      </div>
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
      </div>
      <nav className="main-nav">
        <ul>
          <NavLink to="/home" className="main-nav__element">
            <li>Home</li>
          </NavLink>
          <NavLink to="/about" className="main-nav__element">
            <li>About</li>
          </NavLink>
          {!loggedIn && (
            <NavLink to="/login" className="main-nav__element">
              <li>Log In</li>
            </NavLink>
          )}
          {loggedIn && (
            <li className="main-nav__element" onClick={handleLogOutUser}>
              Log Out
            </li>
          )}
          <NavLink to="/cart-review" className="main-nav__element">
            <li>Cart</li>
          </NavLink>
          <NavLink
            to="/add-product"
            className="main-nav__element add-product-button"
          >
            <li>Add Product</li>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
