import { useState, ReactNode } from "react";

import LoginContext from "./context/login-context";

interface Props {
  children: ReactNode;
}

const LoginContextProvider: React.FC<Props> = (props) => {
  const [loggedIn, setLoggedIn] = useState("");
  const { children } = props;

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
