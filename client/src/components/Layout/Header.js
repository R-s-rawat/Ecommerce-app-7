// import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import SearchbarInputForm from "../Form/SearchbarInputForm";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import siteLogo from '../../images/ecommerceLogo.jpg'
import '../../styles/HeaderStyles.css'

const Header = () => {
  const [auth, setAuth] = useAuth();

  //extract categories state
  // const categories = useCategory();
  const { categories, loadingCategories, categoryError } = useCategory(); 


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
  <header className="header-style" style={{ backgroundColor: 'black' }}>
  <nav className="navbar navbar-expand-lg">
    <div className="container-fluid d-flex justify-content-between align-items-center">

      {/* Left: Toggler and Logo */}
      <div className="d-flex align-items-center">
        {/* Hamburger Menu Icon */}
        <button
          className="navbar-toggler me-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Logo */}
        <Link to="/" className="navbar-brand m-0 d-none d-sm-block">
          <img src={siteLogo} alt="Site logo" width="80"  />
        </Link>
      </div>

      {/* Right: Searchbar (visible on all screen sizes) */}
      <div className="d-flex align-items-center">
        <SearchbarInputForm />
      </div>
    </div>

    {/* Collapsible Content */}
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
        {/* You can remove this Searchbar if it's now above */}
        {/* <li className="nav-item d-none d-lg-block">
          <SearchbarInputForm />
        </li> */}

        <li className="nav-item">
          <NavLink to="/" className="nav-link">Home</NavLink>
        </li>

        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="/categories" data-bs-toggle="dropdown">
            Categories
          </Link>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to="/categories">All Categories</Link>
            </li>
            {categories?.map((c) => (
              <li key={c._id}>
                <Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </li>

        {!auth.user ? (
          <>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">Register</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">Login</NavLink>
            </li>
          </>
        ) : (
          <li className="nav-item dropdown">
            <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
              {auth?.user?.name}
            </NavLink>
            <ul className="dropdown-menu">
              <li>
                <NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" onClick={handleLogout} to="/login">Logout</NavLink>
              </li>
            </ul>
          </li>
        )}

        <li className="nav-item">
          <Badge count={cart?.length} showZero>
            <NavLink to="/cart" className="nav-link">Cart</NavLink>
          </Badge>
        </li>
      </ul>
    </div>
  </nav>
</header>

  );
};

export default Header;
