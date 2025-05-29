import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
   <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <navlink to="/" className="navbar-brand" href="#">
        Hidden brand
      </navlink>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <navlink to="/" className="nav-link active" aria-current="page" href="#">
            Home
          </navlink>
        </li>
        <li className="nav-item">
          <navlink to="/register" className="nav-link" href="#">
            Register
          </navlink>
        </li>
        <li className="nav-item">
          <navlink to="/login" className="nav-link" href="#">
            Login
          </navlink>
        </li>
        <li className="nav-item">
          <navlink to="/cart" className="nav-link" href="#">
            Cart (0)
          </navlink>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </>
  );
};

export default Header;
