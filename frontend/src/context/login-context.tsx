import { Dispatch, SetStateAction, createContext } from "react";

interface LoginContextType {
  loggedIn: string;
  setLoggedIn: Dispatch<SetStateAction<string>>;
}

const LoginContext = createContext<LoginContextType>({} as LoginContextType);

export default LoginContext;
