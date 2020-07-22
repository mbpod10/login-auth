import axios from "axios";
export default {
  login: (user) => {
    return fetch(`http://localhost:5000/api/user/login`, {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
  register: (user) => {
    return fetch(`http://localhost:5000/api/user/register`, {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
  logout: () => {
    return fetch("http://localhost:5000/api/user/logout")
      .then((res) => res.json())
      .then((data) => data);
  },
  isAuthenticated: () => {
    return fetch("http://localhost:5000/api/user/authenticated").then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { isAuthenticated: false, user: { username: "", role: "" } };
      }
    });
  },
};
