import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Checkbox, Radio } from "antd";
import { Prices } from "../../data/Prices";
import { useHomepageLogic } from "./HomepageLogic";
import { useNavigate, useSearchParams } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import Sorting from "../../components/Sort/Sorting";
import FilterDrawer from "../../components/Filters/FilterDrawer";
import "../../styles/HomepageStyles.css";

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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

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

// ================== Load filters + sort + page from URL ==================
useEffect(() => {
  const catParam = searchParams.get("categories");
  const priceParam = searchParams.get("price");
  const sortParam = searchParams.get("sort");
  const pageParam = searchParams.get("page");

  if (catParam) setChecked(catParam.split(","));
  if (priceParam) setRadio(priceParam.split(",").map(Number));
  if (sortParam) setSortPriceRadio(sortParam);
  if (pageParam) setPage(Number(pageParam) || 1);
}, []);


  useEffect(() => {
  const params = {};

  if (checked.length > 0) params.categories = checked.join(",");
  if (radio.length > 0) params.price = radio.join(",");
  if (sortPriceRadio) params.sort = sortPriceRadio;
  if (page > 1) params.page = page; // 👈 include pagination

   console.log("Updating URL params:", params); // 👈 check this in console

  setSearchParams(params, { replace: true });
}, [checked, radio, sortPriceRadio, page]);

  // ================== Load data ==================
  useEffect(() => {
    getTotalCreatedProductsCount(setTotal);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [checked, radio, sortPriceRadio]);

  useEffect(() => {
    const append = page > 1;
    getFilteredProducts({
      checked,
      radio,
      page,
      // sortRef,
       sortKey: sortPriceRadio,
      setProducts,
      setFilteredTotal,
      append,
    });
  }, [page, checked, radio, sortPriceRadio]);

  const handleResetFilters = () => {
    setChecked([]);
    setRadio([]);
    setProducts([]);
    setPage(1);
    setFilteredTotal(0);
    getTotalCreatedProductsCount(setTotal);
    // resetSort(sortRef, setSortPriceRadio);
    resetSort();
    setDrawerOpen(false);
    setSearchParams({}); // clear URL
  };

  return (
    <Layout title="Home - Ecommerce">
      <div className="homepage-container d-flex">
        {/* Sidebar (Desktop) */}
        <aside className="filter-sidebar d-none d-md-block">
          <div className="filter-section">
            <h4>Filter by Category</h4>
            {loadingCategories ? (
              <div className="text-center my-3 text-secondary">
                Loading categories...
              </div>
            ) : categoryError ? (
              <div className="text-danger text-center my-3">
                {categoryError}
              </div>
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
          </div>

          <div className="filter-section">
            <h4>Filter by Price</h4>
            <Radio.Group
              onChange={(e) => setRadio(e.target.value)}
              value={radio}
            >
              {Prices.map((p) => (
                <Radio key={p._id} value={p.array}>
                  {p.name}
                </Radio>
              ))}
            </Radio.Group>
          </div>

          <button className="btn btn-danger" onClick={handleResetFilters}>
            Reset Filters
          </button>
        </aside>

        {/* Main Content */}
        <main className="product-content-area flex-grow-1">
          {/* Mobile Filter Button */}
          <div className="d-md-none d-flex justify-content-end me-2 mb-2">
            <button
              className="btn btn-outline-primary"
              onClick={() => setDrawerOpen(true)}
            >
              Filters
            </button>
          </div>

          {/* Header with Sorting */}
          <div className="product-header mb-3 mt-2" style={{ width: "100%" }}>
            <div
              className="d-none d-md-flex align-items-center mb-2"
              style={{ width: "100%" }}
            >
              <h1 className="mb-0 flex-grow-1">All Products</h1>
              <div className="sorting-wrapper">
                <Sorting
                  // sortType={sortType}
                  sortType={[
    { _id: "newestfirst", name: "Newest First" },
    { _id: "pricelowtohigh", name: "Price: Low to High" },
    { _id: "pricehightolow", name: "Price: High to Low" },
  ]}
                  sortPriceRadio={sortPriceRadio}
                  setSortPriceRadio={setSortPriceRadio}
                  // sortRef={sortRef}
                  setPage={setPage}
                  getFilteredProducts={getFilteredProducts}
                  checked={checked}
                  radio={radio}
                  setProducts={setProducts}
                  setFilteredTotal={setFilteredTotal}
                />
              </div>
            </div>

            {/* Mobile */}
            <div
              className="d-md-none d-flex justify-content-between align-items-center mb-2"
              style={{ width: "100%" }}
            >
              <h1 className="mb-0 ms-2">All Products</h1>
              <div className="flex-shrink-0 me-1" style={{ maxWidth: "60%" }}>
                <Sorting
                  // sortType={sortType}
                   sortType={[
    { _id: "newestfirst", name: "Newest First" },
    { _id: "pricelowtohigh", name: "Price: Low to High" },
    { _id: "pricehightolow", name: "Price: High to Low" },
  ]}
                  sortPriceRadio={sortPriceRadio}
                  setSortPriceRadio={setSortPriceRadio}
                  // sortRef={sortRef}
                  setPage={setPage}
                  getFilteredProducts={getFilteredProducts}
                  checked={checked}
                  radio={radio}
                  setProducts={setProducts}
                  setFilteredTotal={setFilteredTotal}
                />
              </div>
            </div>
          </div>

          {/* Products Section */}
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
            <div className="text-center my-5">
              <p className="text-danger">
                ⚠️ Failed to load products. Please try again.
              </p>
            </div>
          ) : (
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

          {/* Load More */}
          {(checked?.length || radio?.length
            ? products?.length < filteredTotal
            : products?.length < total) && (
            <div className="text-center my-3">
              <button className="btn btn-warning" onClick={loadMore}>
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Drawer */}
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
    </Layout>
  );
};

export default HomePage;
