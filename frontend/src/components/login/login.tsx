import { Link } from "react-router-dom";

import Card from "../shared/Card";

import "./login.css";

const Login = () => {
  return (
    <Card>
      <div className="cart">
        <h2>Login</h2>
        <div>
          <form className="address-form">
            <label>
              E-Mail:
              <input type="text" name="e-mail" />
            </label>
            <label>
              Password:
              <input type="text" name="password" />
            </label>
          </form>
        </div>

        <div className="cart-buttons">
          <Link to="/cart-review">
            <button className="cart-button">Log In</button>
          </Link>
          <div className="total">
            <p>
              No account? <span>Sign up</span> instead!
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Login;
