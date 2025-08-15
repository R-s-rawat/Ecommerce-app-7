import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Checkbox, Radio } from "antd";
import { Prices } from "../../data/Prices";
import { useHomepageLogic } from "./HomepageLogic";
import { useNavigate } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import FilterDrawer from "../../components/Filters/FilterDrawer";
import Sorting from "../../components/Sort/Sorting";

// 🟢 Sorting types list
// const sortType = [
//   { name: "Newest First", _id: "newestfirst" },
//   { name: "Price: High to Low", _id: "pricehightolow" },
//   { name: "Price: Low to High", _id: "pricelowtohigh" },
// ];

const sortType = [
  { name: "Latest", _id: "newestfirst" },
  { name: "Highest", _id: "pricehightolow" },
  { name: "Lowest", _id: "pricelowtohigh" },
];

const HomePage = () => {
  const API =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API
      : "http://localhost:8080";

  const navigate = useNavigate();
  const { categories, loadingCategories, categoryError } = useCategory();
  const [cart, setCart] = useCart();

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

  // 🟢 Mobile filter drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // 🔹 Load total products count on first render
  useEffect(() => {
    getTotalCreatedProductsCount(setTotal);
  }, []);

  // 🔹 Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [checked, radio]);

  // 🔹 Fetch filtered products whenever filters or page changes
  useEffect(() => {
    const append = page > 1;
    getFilteredProducts({
      checked,
      radio,
      page,
      sortRef,
      setProducts,
      setFilteredTotal,
      append,
    });
  }, [page, checked, radio]);

  // 🟢 Handle reset of all filters
  const handleResetFilters = () => {
    setChecked([]);
    setRadio([]);
    setProducts([]);
    setPage(1);
    setFilteredTotal(0);
    getTotalCreatedProductsCount(setTotal);
    resetSort(sortRef, setSortPriceRadio);
    setDrawerOpen(false); // close drawer on reset
  };

  return (
    <Layout title="Home - Ecommerce">
      <div className="row mt-3">
        {/* ===============================
            ✍ DESKTOP FILTER SIDEBAR
           =============================== */}
        <div className="col-md-2 d-none d-md-block">
          {/* Category Filter */}
          <h4 className="text-center">Filter by Category</h4>
          {loadingCategories ? (
            <div className="text-center my-3 text-secondary">
              Loading categories...
            </div>
          ) : categoryError ? (
            <div className="text-danger text-center my-3">{categoryError}</div>
          ) : categories?.length === 0 ? (
            <div className="text-center my-3 text-muted">
              No categories found.
            </div>
          ) : (
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) =>
                    handleCatFilter(
                      e.target.checked,
                      c._id,
                      checked,
                      setChecked
                    )
                  }
                  checked={checked.includes(c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
          )}

          {/* Price Filter */}
          <h4 className="text-center mt-4">Filter by Price</h4>
          <Radio.Group onChange={(e) => setRadio(e.target.value)} value={radio}>
            {Prices.map((p) => (
              <Radio key={p._id} value={p.array}>
                {p.name}
              </Radio>
            ))}
          </Radio.Group>

          {/* Reset Button */}
          <button className="btn btn-danger mt-3" onClick={handleResetFilters}>
            Reset Filters
          </button>
        </div>

        {/* ===============================
            📦 PRODUCTS & SORTING SECTION
           =============================== */}
        <div className="col-md-9">
          {/* Sorting bar */}
          <Sorting
            sortType={sortType}
            sortPriceRadio={sortPriceRadio}
            setSortPriceRadio={setSortPriceRadio}
            sortRef={sortRef}
            setPage={setPage}
            getFilteredProducts={getFilteredProducts}
            checked={checked}
            radio={radio}
            setProducts={setProducts}
            setFilteredTotal={setFilteredTotal}
          />

          {/* Product grid heading */}
          <h1 className="text-center">All Products</h1>

          {/* Loading state (first page only) */}
          {loading && page === 1 ? (
            <div className="d-flex justify-content-center align-items-center my-5 w-100">
              <div
                className="spinner-border text-primary"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error && products?.length === 0 ? (
            // Error state
            <div className="text-center my-5">
              <p className="text-danger">
                ⚠️ Failed to load products. Please try again.
              </p>
            </div>
          ) : (
            // Product grid
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div key={p._id} className="card m-2 product-card">
                  <img
                    src={`${API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top product-img"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text">$ {p.price}</p>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-secondary ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        toast.success("Item added to cart");
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {(checked?.length || radio?.length
            ? products?.length < filteredTotal
            : products?.length < total) && (
            <div className="text-center my-3">
              <button className="btn btn-warning" onClick={loadMore}>
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
