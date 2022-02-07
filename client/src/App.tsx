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
import Navigation from "./Student/Navigation";
import Error from "./404/Error";
import ReflectionOverview from "./Student/ReflectionOverview";

const STUDENT_INFO = "http://localhost:8080/getStudentInfo";

function App() {
  const [studentInfo, setStudentInfo] = useState<Student[]>([]);
  const [studentEmail, setStudentEmail] = useState<string>();
  const { token, setToken } = useToken();

  // set the student info into the proper state variables
  const onResponse = (result: JSONData): void => {
    setStudentInfo(result.students);
  };

  // get all of the student info
  React.useEffect((): void => {
    getJSONData(STUDENT_INFO, onResponse, (): void =>
      console.log("Error Retrieving JSON Data")
    );
  }, []);

  // COMMENTED OUT FOR TESTING !!!!!!!!!!!!!!!
  if (!token || token === "") {
    return (
      <Login
        setToken={setToken}
        setStudentInfo={setStudentInfo}
        studentInfo={studentInfo}
        setStudentEmail={setStudentEmail}
        studentEmail={studentEmail}
      />
    );
  } else if (token === "create") {
    return (
      <Create
        setToken={setToken}
        setStudentInfo={setStudentInfo}
        studentInfo={studentInfo}
        setStudentEmail={setStudentEmail}
        studentEmail={studentEmail}
      />
    );
  } else if (token === "teacher") {
    return <Overview />;
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Navigation
          setToken={setToken}
          setStudentInfo={setStudentInfo}
          studentInfo={studentInfo}
          setStudentEmail={setStudentEmail}
          studentEmail={studentEmail}
        ></Navigation>
        <Switch>
          <Route path="/" exact>
            <ReflectionForm
              setToken={setToken}
              setStudentInfo={setStudentInfo}
              studentInfo={studentInfo}
              setStudentEmail={setStudentEmail}
              studentEmail={studentEmail}
            />
          </Route>
          <Route path="/ReflectionForm">
            <ReflectionForm
              setToken={setToken}
              setStudentInfo={setStudentInfo}
              studentInfo={studentInfo}
              setStudentEmail={setStudentEmail}
              studentEmail={studentEmail}
            />
          </Route>
          <Route path="/ReflectionOverview">
            <ReflectionOverview
              setToken={setToken}
              setStudentInfo={setStudentInfo}
              studentInfo={studentInfo}
              setStudentEmail={setStudentEmail}
              studentEmail={studentEmail}
            />
          </Route>
          <Route>
            <Error></Error>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
