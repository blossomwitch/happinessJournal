import { useState } from "react";
import { Token } from "../Tools/data.model";

const useToken = () => {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken =
      tokenString !== null ? JSON.parse(tokenString) : undefined;
    return userToken?.token;
  };

  const [token, setToken] = useState<string>(getToken);

  const saveToken = (userToken: Token) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
};

export default useToken;
