import { useState, useRef } from "react";
import axios from "axios";

export const useHomepageLogic = () => {
  const API =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API
      : "http://localhost:8080";

  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]); // category ids
  const [radio, setRadio] = useState([]); // price range
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filteredTotal, setFilteredTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [sortPriceRadio, setSortPriceRadio] = useState("newestfirst");
  const sortRef = useRef("newestfirst");

  const getTotalCreatedProductsCount = async (setTotal) => {
    try {
      const { data } = await axios.get(`${API}/api/v1/product/product-count`);
      setTotal(data?.total || 0);
    } catch (err) {
      console.error("Error getting product count:", err);
    }
  };

const getFilteredProducts = async ({
    checked,
    radio,
    page,
    // accept either a string sortKey or a ref (for old callers)
    sortKey,
    sortRef: incomingSortRef,
    setProducts,
    setFilteredTotal,
    append = false,
  }) => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      setLoading(true);
      setError(false);

      const timeout = setTimeout(() => controller.abort(), 60000);

      // Resolve the actual sort key
      const key =
        sortKey ??
        incomingSortRef?.current ??
        sortPriceRadio; // fallback to hook state

      const sortingObject =
        key === "pricehightolow"
          ? { price: -1 }
          : key === "pricelowtohigh"
          ? { price: 1 }
          : { createdAt: -1 };

      const { data } = await axios.post(
        `${API}/api/v1/product/product-filters`,
        { checked, radio, page, sortingObject },
        { signal, withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      clearTimeout(timeout);

      if (append) {
        setProducts((prev) => [...prev, ...data.filteredProducts]);
      } else {
        setProducts(data.filteredProducts);
      }

      // make sure this is a NUMBER; adjust to your API’s field name
      const count =
        data.filteredTotal ??
        data.totalFiltered ??
        data.total ??
        data.filteredProducts?.length ??
        0;
      setFilteredTotal(count);
    } catch (err) {
      if (err.name === "CanceledError") {
        console.warn("❌ Product fetch aborted due to timeout");
      } else {
        console.error("❌ Error fetching products:", err);
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCatFilter = (checkedValue, id, checked, setChecked) => {
    const updated = checkedValue
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    setChecked(updated);
  };

  const resetSort = () => {
    setSortPriceRadio("newestfirst");
    if (sortRef) sortRef.current = "newestfirst"; // harmless if kept
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return {
    products,
    checked,
    radio,
    page,
    total,
    loading,
    error,
    filteredTotal,
    sortPriceRadio,
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
      sortPriceRadio,
    sortRef, // optional
  };
};
