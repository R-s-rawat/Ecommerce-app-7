import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import SearchbarInputForm from "../Form/SearchbarInputForm";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();

  //extract categories state
  const categories = useCategory();

  // show cart, useCart hook (providers data should show), so only destructure cart state's context(the getter)
  const [cart] = useCart();

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
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown link
              </a>
              {categories?.map((c) => (
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      {c.name}
                    </a>
                  </li>
                </ul>
              ))}
            </li> */}

            {/* // BS-5 utility classes  (ME)margin-end: auto && (MS)margin-start: auto*/}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {" "}
              {/* nav-bar is a ul,, and shows many li*/}
              <SearchbarInputForm />
              {/* // Home - 1st list-item-navbar */}
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              {/* // Home Ends */}
              {/*------------------------------------------------------- */}
              {/* // Category - 2nd list-item-navbar */}
             
                <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {/* //Category Ends */}
              {/*------------------------------------------------------- */}
              {
                // !auth.user ? (false) : (true)
              }
              {!auth.user ? (
                <>
                  {/* //Register -  list-item-navbar(auth based) */}
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  {/* //Register Ends */}
                  {/*------------------------------------------------------- */}
                  {/* //Login -  list-item-navbar(auth based)*/}
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
                  {/* // role based authentication begins -  list-item-navbar(auth based) */}
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
                        <NavLink
                          className="dropdown-item"
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
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
              {/* // Cart -  list-item-navbar */}
              <li className="nav-item">
                {/* <NavLink to="/cart" className="nav-link">
                  Cart {cart?.length}
                </NavLink> */}
                <Badge count={cart?.length} showZero>
                  <NavLink to='/cart' className='nav-link'>
                  {/* Cart {cart?.length} */}
                  Cart
                  </NavLink>
                </Badge>
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
