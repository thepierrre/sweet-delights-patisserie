import "./Header.css";
import mainLogo from "../../static/main-logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="main-logo">
        <div className="main-logo__picture">
          <img src={mainLogo} />
        </div>
        <div className="main-logo__text">
          <h1>Sweet Delights</h1>
        </div>
      </div>
      <nav className="main-nav">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Log In</li>
          <li>Cart</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
