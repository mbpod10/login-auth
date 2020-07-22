import React, { useState, useRef, useEffect } from "react";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message";

const Register = (props) => {
  const [user, setUser] = useState({ username: "", password: "", role: "" });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
    console.log(user);
  };

  const resetForm = () => {
    setUser({ username: "", password: "", role: "" });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    AuthService.register(user).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push("/login");
        }, 2000);
      }
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Register</h3>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" onChange={onChange}></input>
        <label htmlFor="password">Password</label>
        <input type="text" name="password" onChange={onChange}></input>
        <label htmlFor="role">Role</label>
        <input type="text" name="role" onChange={onChange}></input>
        <button type="submit">Register</button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Register;
