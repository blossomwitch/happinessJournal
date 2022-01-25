import { useState } from "react";
import { Token } from "../Tools/data.model";

const useToken = () => {

  // get the token from the session storage and set token to session token value
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken =
      tokenString !== null ? JSON.parse(tokenString) : undefined;
    return userToken?.token;
  };

  const [token, setToken] = useState<string>(getToken);

  // save the token to the session storage
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
