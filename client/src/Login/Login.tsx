import { useState } from "react";
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

  // get a token from the server if login was valid
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

  // set the returned token to be saved in the session
  const onResponse = (result:Token):void => {
    setToken(result)  
  }

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={onSubmit}>
        <label>
          <p>Email/Username</p>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div
        style={{
          display: (errorMsg === undefined ? true : false) ? "none" : "block",
        }}
      >
        {errorMsg}
      </div>
    </div>
  );
};

export default Login;
