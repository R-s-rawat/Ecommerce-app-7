// import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import SearchbarInputForm from "../Form/SearchbarInputForm";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import siteLogo from "../../images/ecommerceLogo.jpg";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import FilterDrawer from "../../components/Filters/FilterDrawer";
import { useHomepageLogic } from "../../pages/Homepage/HomepageLogic";
import "../../styles/HeaderStyles.css";

const Header = () => {
  const [auth, setAuth] = useAuth();

  const {
    products,
    checked,
    radio,
    page,
    total,
    loading,
    error,
    filteredTotal,
    sortPriceRadio,
    sortRef,
    setChecked,
    setRadio,
    setPage,
    setProducts,
    setFilteredTotal,
    setSortPriceRadio,
    handleCatFilter,
    loadMore,
    resetSort,
    getTotalCreatedProductsCount,
    getFilteredProducts,
    setTotal,
    setError,
  } = useHomepageLogic();

  // 🟢  drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [categoryOpen, setCategoryOpen] = useState(false);

  //extract categories state
  // const categories = useCategory();
  const { categories, loadingCategories, categoryError } = useCategory();

  // show cart, useCart hook (providers data should show), so only destructure cart state's context(the getter)
  const [cart] = useCart();

  // handle close filters
  const handleResetFilters = () => {
    setChecked([]);
    setRadio([]);
    setProducts([]);
    setPage(1);
    setFilteredTotal(0);
    getTotalCreatedProductsCount(setTotal);
    resetSort(sortRef, setSortPriceRadio);
    setDrawerOpen(false); // 🟢 close drawer on reset
  };

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
    <header className="header-style">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          {/* Left: logo/toggler */}
          <div className="d-flex align-items-center">
            <button
              className="navbar-toggler me-2"
              type="button"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="navbar-toggler-icon" />
            </button>
            <Link to="/" className="navbar-brand m-0 d-none d-sm-block">
              <img src={siteLogo} alt="Site logo" width="80" />
            </Link>
          </div>

          {/* Middle: searchbar (flex-grow keeps it wide) */}
          <div className="flex-grow-1 d-flex justify-content-center">
            <SearchbarInputForm />
            {/* 🟢 Filter Button for Mobile */}{" "}
            <div className="d-block d-md-none text-end px-3">
              {" "}
              <button
                className="btn btn-warning"
                onClick={() => setDrawerOpen(true)}
              >
                {" "}
                Filters{" "}
              </button>{" "}
            </div>{" "}
            {/* 🟢 Mobile Filter Drawer */}{" "}
            <FilterDrawer
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              categories={categories}
              checked={checked}
              radio={radio}
              setChecked={setChecked}
              setRadio={setRadio}
              handleCatFilter={handleCatFilter}
              onReset={handleResetFilters}
            />
          </div>

          {/* Right: desktop menu */}
          <ul className="navbar-nav d-none d-lg-flex align-items-center">
            {!auth.user ? (
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                    className="nav-link"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className="nav-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav-item">
              <Badge count={cart?.length} showZero>
                <NavLink to="/cart" className="nav-link">
                  Cart
                </NavLink>
              </Badge>
            </li>
          </ul>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`custom-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header d-flex justify-content-between align-items-center px-3 py-2">
          {/* <h5 className="text-white m-0">Menu</h5> */}
          {/* <button className="btn btn-sm btn-light">X</button> */}
          <img src={siteLogo} alt="Site logo" width="80" />
          <button
            className="navbar-toggler me-2"
            type="button"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>

        {/* Divider line */}
        <hr className="sidebar-divider" />

        {/* now the items in sidbar */}
        <ul className="list-unstyled px-3">
          <li>
            <NavLink
              to="/"
              className="nav-link"
              onClick={() => setSidebarOpen(false)}
            >
              Home
            </NavLink>
          </li>

          {!auth.user ? (
            <li>
              <NavLink
                to="/login"
                className="nav-link"
                onClick={() => setSidebarOpen(false)}
              >
                Login
              </NavLink>
            </li>
          ) : (
            <>
              <li>
                <NavLink
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                  className="nav-link"
                  onClick={() => setSidebarOpen(false)}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className="nav-link"
                  onClick={() => {
                    handleLogout();
                    setSidebarOpen(false);
                  }}
                >
                  Logout
                </NavLink>
              </li>
            </>
          )}
          <li>
            <Badge count={cart?.length} showZero>
              <NavLink
                to="/cart"
                className="nav-link"
                onClick={() => setSidebarOpen(false)}
              >
                Cart
              </NavLink>
            </Badge>
          </li>

          {/* dropdown for === categories */}
          <li className="nav-item">
            <div
              className="nav-link d-flex justify-content-between align-items-center category-toggle"
              onClick={() => setCategoryOpen(!categoryOpen)}
              style={{ cursor: "pointer" }}
            >
              <span>Categories</span>
              {categoryOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            <ul className={`category-dropdown ${categoryOpen ? "open" : ""}`}>
              <li>
                <Link
                  to="/categories"
                  className="dropdown-item"
                  onClick={() => {
                    setSidebarOpen(false);
                    setCategoryOpen(false);
                  }}
                >
                  All Categories
                </Link>
              </li>
              {categories?.map((c) => (
                <li key={c._id}>
                  <Link
                    to={`/category/${c.slug}`}
                    className="dropdown-item"
                    onClick={() => {
                      setSidebarOpen(false);
                      setCategoryOpen(false);
                    }}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
