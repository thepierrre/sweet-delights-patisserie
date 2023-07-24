import { useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useForm from "../../hooks/form-hook";
import LoginContext from "../../context/login-context";
import Card from "../shared/Card";

import "./login.css";

const LogIn = () => {
  const { setLoggedIn } = useContext(LoginContext);
  const { formValues, formValidity, handleInputChange, isFormValid } = useForm({
    email: "",
    password: "",
  });

  const getSessionIdFromCookie = () => {
    const cookieArray = document.cookie.split(";");
    const sessionIdCookie = cookieArray.find((cookie) =>
      cookie.trim().startsWith("sessionId=")
    );
    if (sessionIdCookie) {
      return sessionIdCookie.split("=")[1];
    }
    return null;
  };

  useEffect(() => {
    const fetchUserInformation = async () => {
      const sessionId = getSessionIdFromCookie();
      if (sessionId) {
        try {
          const response = await axios.get(
            `http://localhost:5003/api/session/${sessionId}`
          );
          const { name } = response.data.user;
          setLoggedIn(name);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchUserInformation();
  }, []);

  // useEffect(() => {
  //   const checkLoggedIn = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5003/api/session");
  //       const { name } = response.data.user;
  //       setLoggedIn(name);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   checkLoggedIn();
  // }, [setLoggedIn]);

  const logInUser = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isFormValid) {
      try {
        const response = await axios.post("http://localhost:5003/api/login", {
          email: formValues.email,
          password: formValues.password,
        });

        const { name } = response.data.user;
        console.log(`Logged in as ${name}!`);
        setLoggedIn(name);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Card>
      <div className="cart">
        <h2>Log in</h2>
        <div>
          <form className="address-form" onSubmit={logInUser}>
            <label>
              E-Mail:
              <input
                type="text"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Password:
              <input
                type="text"
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit" className="cart-button">
              Log in
            </button>
          </form>
        </div>
        <div className="cart-actions">
          <div className="switch">
            <p className="switch-text">
              No account?{" "}
              <span>
                <Link to="/signup" className="switch-text__link">
                  Sign up instead!
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LogIn;
