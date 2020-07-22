import React, { useState, useContext } from "react";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message";
import { AuthContext } from "../Context/AuthContext";

const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = (event) => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
    console.log(user);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    AuthService.login(user).then((data) => {
      console.log(data);
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setisAuthenticated(isAuthenticated);
        props.history.push("/todos");
      } else {
        setMessage(message);
      }
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Please sign in</h3>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" onChange={onChange}></input>
        <label htmlFor="password">Password</label>
        <input type="text" name="password" onChange={onChange}></input>
        <button type="submit">Login</button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Login;
