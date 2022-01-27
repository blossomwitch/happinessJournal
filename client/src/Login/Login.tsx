import { useState } from "react";
import "./Login.scss";
// import img from './logo.png';
import img from './logo.png';
// import img from './logo3.png'; 
import { ComponentProps, Token } from "../Tools/data.model";
import { sendJSONData, getJSONData } from "../Tools/Toolkit";
// import { ComponentProps } from "../Tools/data.model";

const SEND_SCRIPT: string = "http://localhost:8080/login";
const RETRIEVE_SCRIPT_STUDENT: string = "http://localhost:8080/studentToken";
const RETRIEVE_SCRIPT_TEACHER: string = "http://localhost:8080/teacherToken";

const Login = ({setToken}:ComponentProps) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errorMsg, setErrorMsg] = useState<string>();

  const onSubmit = (e: any): void => {
    e.preventDefault();
    // send email and password to the server to authenticate
    let sendJSON = {
      email: email,
      password: password,  
    };
    let sendString = JSON.stringify(sendJSON);
    sendJSONData(SEND_SCRIPT, sendString, onSuccess, onError, "POST");
  };

  const onSuccess = (e: any): void => {
    setErrorMsg(undefined);
    if (email === "admin") {
      getJSONData(RETRIEVE_SCRIPT_TEACHER, onResponse, ():void=>(console.log("Error getting session token")));
    } else {
      getJSONData(RETRIEVE_SCRIPT_STUDENT, onResponse, ():void=>(console.log("Error getting session token")));
    }
  };

  const onError = (e: any): void => {
    setErrorMsg("Incorrect username or password.");
    console.log("Error sending login information to server");
  };

  const onResponse = (result:Token):void => {
    setToken(result)  
  }

  return (
    <div className="login-wrapper">
      <div className="login-logo">
        {/* Logo will add */}
        <img src={img} />
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
            <button className="btnCreate" type="submit">Create User Account</button>
          </div>
        </form>
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
