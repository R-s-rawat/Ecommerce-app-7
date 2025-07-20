import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Checkbox, Radio } from "antd";
import { Prices } from "../../data/Prices";
import { useHomepageLogic } from "./HomepageLogic";
import { useNavigate } from "react-router-dom";

const sortType = [
  { name: "Newest First", _id: "newestfirst" },
  { name: "Price: High to Low", _id: "pricehightolow" },
  { name: "Price: Low to High", _id: "pricelowtohigh" },
];

const HomePage = () => {
  
  const API =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API
      : "http://localhost:8080";

  const navigate = useNavigate();

  const {
    products,
    categories,
    checked,
    radio,
    page,
    total,
    loading,
    filteredTotal,
    sortPriceRadio,
    sortRef,
    setCategories,
    setChecked,
    setRadio,
    setPage,
    setProducts,
    setFilteredTotal,
    setSortPriceRadio,
    handleCatFilter,
    loadMore,
    resetSort,
    getAllCategories,
    getTotalCreatedProductsCount,
    getFilteredProducts,
    setTotal,
  } = useHomepageLogic();

  useEffect(() => {
    getAllCategories(setCategories);
    getTotalCreatedProductsCount(setTotal);
  }, []);

//   useEffect(() => {
//   const isInitialLoad = page === 1 && !checked.length && !radio.length; //it's ought to be false, as dependencies changed 👌
//   getFilteredProducts({
//     checked,
//     radio,
//     page,
//     sortRef,
//     setProducts,
//     setFilteredTotal,
//     append: !isInitialLoad, // Append if it's not first load (append to the product list, not overwrite. i.e !isInitalLoad='T')
//   });
// }, [checked, radio, page]);

useEffect(() => {
  const append = page !== 1; // Append only when page > 1 ("Load More")
  getFilteredProducts({
    checked,
    radio,
    page,
    sortRef,
    setProducts,
    setFilteredTotal,
    append,
  });
}, [checked, radio, page]);

  // useEffect(() => {
  //   if (page === 1) return;
  //   getFilteredProducts({
  //     checked,
  //     radio,
  //     page,
  //     sortRef,
  //     setProducts,
  //     append: true,
  //   });
  // }, [page]);

/* a multi line comment */

  // useEffect(() => {
  //   getFilteredProducts({
  //     checked,
  //     radio,
  //     page: 1,
  //     sortRef,
  //     setProducts,
  //     setFilteredTotal,
  //   });
  // }, [checked, radio]);

  return (
    <Layout title="Home - Ecommerce">
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter by Category</h4>
          <div className="d-flex flex-column">
            {categories.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) =>
                  handleCatFilter(e.target.checked, c._id, checked, setChecked)
                }
                checked={checked.includes(c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h4 className="text-center mt-4">Filter by Price</h4>
          <Radio.Group onChange={(e) => setRadio(e.target.value)} value={radio}>
            {Prices.map((p) => (
              <Radio key={p._id} value={p.array}>
                {p.name}
              </Radio>
            ))}
          </Radio.Group>

          <button
            className="btn btn-danger mt-3"
            onClick={() => {
              setChecked([]);
              setRadio([]);
              setProducts([]);
              setPage(1);
              setFilteredTotal(0);
              getTotalCreatedProductsCount(setTotal);
              resetSort(sortRef, setSortPriceRadio);
            }}
          >
            Reset Filters
          </button>
        </div>

        <div className="col-md-9">
          <div className="d-flex flex-row mb-3">
            <h4 className="me-3">Sort by</h4>
            <Radio.Group
              value={sortPriceRadio}
              onChange={(e) => {
                const selected = e.target.value;
                setSortPriceRadio(selected);
                sortRef.current = selected;
                // ✅ Reset page to 1
                setPage(1);
                getFilteredProducts({
                // ✅ Fetch fresh sorted products from page 1
                  checked,
                  radio,
                  page: 1,
                  sortRef,
                  setProducts,
                  setFilteredTotal,
                });
              }}
            >
              {sortType.map((t) => (
                <Radio key={t._id} value={t._id}>
                  {t.name}
                </Radio>
              ))}
            </Radio.Group>
          </div>

          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products.map((p) => (
              <div
                key={p._id}
                className="card m-2 product-card"
                onClick={() => navigate(`/product/${p.slug}`)}
              >
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
                  <p className="card-text">₹ {p.price}</p>
                </div>
              </div>
            ))}
          </div>
{/* {console.log(filteredTotal)} */}
          {(checked.length || radio.length
            ? products.length < filteredTotal
            : products.length < total) && (
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
