import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";

const Header = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      // we are spreading auth, as it is not mandatory that we have only user && token,
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              🛒 Ecommerce App
            </Link>
            {/* // BS-5 utility classes  (ME)margin-end: auto && (MS)margin-start: auto*/}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* // Home */}
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              {/* // Home Ends */}
              {/*------------------------------------------------------- */}
              {/* // Category */}
              <li className="nav-item">
                <NavLink to="/category" className="nav-link">
                  Category
                </NavLink>
              </li>
              {/* //Category Ends */}
              {/*------------------------------------------------------- */}
              {
                // !auth.user ? (false) : (true)
              }
              {!auth.user ? (
                <>
                  {/* //Register */}
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  {/* //Register Ends */}
                  {/*------------------------------------------------------- */}
                  {/* //Login */}
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                  {/* // Login Ends */}
                  {/*------------------------------------------------------- */}
                </>
              ) : (
                <>
                  {/* // role based authentication begins */}
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      {/* for dashboard */}
                      <li>
                        <NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1? 'admin':'user'}`}>
                          Dashboard
                        </NavLink>
                      </li>
                      {/* for logout */}
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          // className="nav-link"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                      {/* <li>
                        <hr className="dropdown-divider" />
                      </li> */} 
                    </ul>
                  </li>
                  {/* // role based authentication ends */}
                  {/* //logout */}
                  {/* <li className="nav-item">
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="nav-link"
                    >
                      Logout
                    </NavLink>
                  </li> */}
                  {/* //logout Ends */}
                  {/*------------------------------------------------------- */}
                </>
              )}
              {/* // Cart */}
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  Cart (0)
                </NavLink>
              </li>
              {/* // Cart Ends */}
            </ul>
          </div>
          {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        </div>
      </nav>
    </>
  );
};

export default Header;
