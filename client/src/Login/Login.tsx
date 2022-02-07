import { useState } from "react";
import "./Login.scss";
import img from './logo.png';
import { ComponentProps, Token } from "../Tools/data.model";
import { sendJSONData } from "../Tools/Toolkit";

const SEND_SCRIPT: string = "http://localhost:8080/login";

const Login = ({setToken, setStudentEmail}:ComponentProps) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errorMsg, setErrorMsg] = useState<string>();

  // send email and password to the server to authenticate
  const onSubmit = (e: any): void => {
    e.preventDefault();
    let sendJSON = {
      email: email,
      password: password,  
    };
    let sendString = JSON.stringify(sendJSON);
    sendJSONData(SEND_SCRIPT, sendString, onSuccess, onError, "POST");
  };

  const onSuccess = (e: any): void => {
    setErrorMsg(undefined);
    sessionStorage.setItem("email", JSON.stringify(email));
    if (email === "admin") {
      const token: Token = {
        token: "teacher",
      };
      setToken(token);
    } else {
      const token: Token = {
        token: "student",
      };
      setToken(token);
    }
  };

  const onError = (e: any): void => {
    setErrorMsg("Incorrect username or password.");
    console.log("Error sending login information to server");
  };

  // set the token to view the create account page
  const create = (e:any):void => {
    const token:Token = {
      token: "create"
    };
    setToken(token);
  }

  return (
    <div className="login-wrapper">
      <div className="login-logo">
        {/* Logo will add */}
        <img src={img} alt="happiness journal logo"/>
      </div>
      <div className="login-content">
        {/* <h3 className="login-title">Please Log In</h3> */}
        <form onSubmit={onSubmit}>
          <div className="login-input">
            <input
              id="username" 
              type="text" 
              placeholder="Email / Username" 
              onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="username">Email / Username</label>
          </div>
          <div className="login-input">
            {/* Will changed */}
            <input
              id="password"
              type="password"
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>
            <span className="errormsg">{errorMsg}</span>
          <div>
            <button className="btnLogin" type="submit">Login</button>
            <button className="btnLogin-teacher" type="submit">Teacher Login</button>  
          </div>
        </form>
        <button className="btnCreate" onClick={create}>Create User Account</button>
        <div
          style={{
            display: (errorMsg === undefined ? true : false) ? "none" : "block",
          }}
        >
        </div>
      </div>
    </div>
  );
};

export default Login;

