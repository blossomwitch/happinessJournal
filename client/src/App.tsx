import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import Login from "./Login/Login";
import ReflectionForm from "./Student/ReflectionForm";
import Overview from "./Teacher/Overview";

function App() {
  const [token, setToken] = useState<string>();

  if (!token) {
    return <Login setToken={setToken}/>;
  } else if (token === "teacher") {
    return <Overview />
  }

  return (
    <div className="wrapper">
      <h1>Happiness Journal Web App</h1>
      <h2>Token: {token}</h2>
      <BrowserRouter>
        <Switch>
          <Route path="/ReflectionForm">
            <ReflectionForm />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
