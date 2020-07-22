import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
import { authenticate } from "passport";

const Navbar = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );
  console.log(user, isAuthenticated);

  //setIsAuthenticated(false);

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const unauthenticatedNavBar = () => {
    return (
      <>
        <Link to="/">
          <li> Home</li>
        </Link>
        <Link to="/login">
          <li> Login</li>
        </Link>
        <Link to="/register">
          <li> Register</li>
        </Link>
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <Link to="/">
          <li> Home</li>
        </Link>
        <Link to="/todos">
          <li> ToDos</li>
        </Link>
        {user.role === "admin" ? (
          <Link to="/admin">
            <li> Admin</li>
          </Link>
        ) : null}
        <button type="button" className="" onClick={onClickLogoutHandler}>
          Logout
        </button>
      </>
    );
  };

  return (
    <nav>
      <Link to="/">
        <div>Eatr.y</div>
      </Link>
      <div>
        <ul>
          {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
