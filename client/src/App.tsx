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
import TeacherNavigation from "./Teacher/TeacherNavigation"; 
import StudentList from "./Teacher/StudentList";

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

  if (!token || token === "") {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Login
              setToken={setToken}
              setStudentInfo={setStudentInfo}
              studentInfo={studentInfo}
              setStudentEmail={setStudentEmail}
              studentEmail={studentEmail}
            />
          </Route>
          <Route path="/createAccount">
            <Create
              setToken={setToken}
              setStudentInfo={setStudentInfo}
              studentInfo={studentInfo}
              setStudentEmail={setStudentEmail}
              studentEmail={studentEmail}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  } else if (token === "teacher") {
    return (
      <BrowserRouter>
        <TeacherNavigation
          setToken={setToken}
          setStudentInfo={setStudentInfo}
          studentInfo={studentInfo}
          setStudentEmail={setStudentEmail}
          studentEmail={studentEmail}
        ></TeacherNavigation>
        <Switch>
          <Route path="/" exact>
            <Overview
              setToken={setToken}
              setStudentInfo={setStudentInfo}
              studentInfo={studentInfo}
              setStudentEmail={setStudentEmail}
              studentEmail={studentEmail}
            />
          </Route>
          <Route path="/studentList" exact>
            <StudentList
                setToken={setToken}
                setStudentInfo={setStudentInfo}
                studentInfo={studentInfo}
                setStudentEmail={setStudentEmail}
                studentEmail={studentEmail}
              />
          </Route>
        </Switch>
      </BrowserRouter>
    );
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
