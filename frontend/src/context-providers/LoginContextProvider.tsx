import { useState, ReactNode, useEffect } from "react";

import LoginContext from "../context/login-context";
import axios from "../axiosInstance";

interface Props {
  children: ReactNode;
}

const LoginContextProvider: React.FC<Props> = (props) => {
  const [loggedIn, setLoggedIn] = useState("");
  const { children } = props;

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get("login/me");
      const { name } = response.data.user;
      setLoggedIn(name);
    };
    getUser();
  }, []);

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
