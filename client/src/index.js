import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthProvider from "./Context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
