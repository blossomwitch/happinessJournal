import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import Login from "./Login/Login";
import useToken from "./Login/useToken";
import ReflectionForm from "./Student/ReflectionForm";
import Overview from "./Teacher/Overview";
import Create from "./Create/Create";
import { getJSONData } from "./Tools/Toolkit";
import { JSONData, Student } from "./Tools/data.model";
import { useState } from "react";
import React from "react";

function App() {

  const [studentInfo, setStudentInfo] = useState<Student[]>([]);
  const { token, setToken } = useToken();

  // set the student info into the proper state variables
  const onResponse = (result:JSONData):void => {
    setStudentInfo(result.students);
  }

  // get all of the student info 
  React.useEffect(():void => {
    getJSONData("http://localhost:8080/getStudentInfo", onResponse, (): void => console.log("Error Retrieving JSON Data"));
  }, []);

  if (!token || token === "") {
    return <Login setToken={setToken} studentInfo={studentInfo}/>;
  } else if (token === "create") {
    return <Create setToken={setToken} studentInfo={studentInfo}/>
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
