import React, { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import NavBar from "./Components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
// import AuthProvider from "./Context/AuthContext";

function App() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
    AuthContext
  );
  console.log(user, isAuthenticated);
  return (
    <>
      <Router>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
      </Router>
    </>
  );
}

export default App;
