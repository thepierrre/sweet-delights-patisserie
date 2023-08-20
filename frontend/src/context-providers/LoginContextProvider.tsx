import { useState, ReactNode } from "react";

import LoginContext from "../context/login-context";

interface Props {
  children: ReactNode;
}

const LoginContextProvider: React.FC<Props> = (props) => {
  const [loggedIn, setLoggedIn] = useState("");
  const [userId, setUserId] = useState("");
  const { children } = props;

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn, userId, setUserId }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
