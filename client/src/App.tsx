import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import Login from "./Login/Login";
import useToken from "./Login/useToken";
import ReflectionForm from "./Student/ReflectionForm";
import Overview from "./Teacher/Overview";
import Create from "./Create/Create";

function App() {

  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken}/>;
  } else if (token === "create") {
    return <Create />
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
