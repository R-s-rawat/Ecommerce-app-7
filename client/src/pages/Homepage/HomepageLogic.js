import { useState, useRef } from "react";
import axios from "axios";

export const useHomepageLogic = () => {
  const API =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API
      : "http://localhost:8080";

  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filteredTotal, setFilteredTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // ✅ for errors
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
  sortRef,
  setProducts,
  setFilteredTotal,
  append = false,
  setLoading,
  setError,
}) => {
  const controller = new AbortController();

  const API =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API
      : "http://localhost:8080";

  if (setLoading) setLoading(true);
  if (setError) setError(false);

  try {
    const timeout = setTimeout(() => {
      controller.abort();
    }, 60000); // 1 minute

    // let sortingObject = { createdAt: -1 };
      // if (sortRef.current === "pricehightolow") sortingObject = { price: -1 };
      // if (sortRef.current === "pricelowtohigh") sortingObject = { price: 1 };

    const { data } = await axios.post(
      `${API}/api/v1/product/filtered-products`,
      { checked, radio, page, 
      // // sort: sortRef.current 
      // let sortingObject = { createdAt: -1 };
      // if (sortRef.current === "pricehightolow") sortingObject = { price: -1 };
      // if (sortRef.current === "pricelowtohigh") sortingObject = { price: 1 };
      sortingObject:
        sortRef.current === "pricehightolow"   ? { price: -1 }
          : sortRef.current === "pricelowtohigh" ? { price: 1 }
          : { createdAt: -1 },
      },
      { signal: controller.signal }
    );

    clearTimeout(timeout);

    if (append) {
      setProducts((prev) => [...prev, ...data.products]);
    } else {
      setProducts(data.products);
    }

    setFilteredTotal(data.total || 0);
  } catch (err) {
    if (err.name === "CanceledError" || err.code === "ERR_CANCELED") {
      console.warn("⚠️ Product fetch aborted due to timeout.");
    } else {
      console.error("❌ Error fetching products:", err);
      if (setError) setError(true);
    }
  } finally {
    if (setLoading) setLoading(false);
  }
};



  const handleCatFilter = (checkedValue, id, checked, setChecked) => {
    const updated = checkedValue
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    setChecked(updated);
  };

  const resetSort = (sortRef, setSortPriceRadio) => {
    sortRef.current = "newestfirst";
    setSortPriceRadio("newestfirst");
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
    error, // ✅ for errors
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
    setError
  };
};
