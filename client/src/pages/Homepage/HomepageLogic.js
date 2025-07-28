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
}) => {
  setError(null);
  setLoading(true);

  let finished = false;

  const delay = new Promise((resolve) => setTimeout(resolve, 60000)); // 1 minute
  
  const apiCall = axios
    .post(`${API}/api/v1/product/product-filters`, {
      checked,
      radio,
      page,
      // let sortingObject = { createdAt: -1 };
      // if (sortRef.current === "pricehightolow") sortingObject = { price: -1 };
      // if (sortRef.current === "pricelowtohigh") sortingObject = { price: 1 };
      sortingObject:
        sortRef.current === "pricehightolow"   ? { price: -1 }
          : sortRef.current === "pricelowtohigh" ? { price: 1 }
          : { createdAt: -1 },
    })
    .then(({ data }) => {
      if (append) {
        setProducts((prev) => [
          ...prev,
          ...(Array.isArray(data?.filteredProducts) ? data.filteredProducts : []),
        ]);
      } else {
        setProducts(
          Array.isArray(data?.filteredProducts) ? data.filteredProducts : []
        );
      }

      if (setFilteredTotal) {
        setFilteredTotal(data?.filteredTotal || 0);
      }

      finished = true;
    })
    .catch((err) => {
      console.error("Error fetching filtered products:", err);
      setError("⚠️ Failed to load products. Please try again.");
    });

  // Wait for both API call and delay
  await Promise.all([delay, apiCall]);

  // Only turn off loading after delay + api finishes
  setLoading(false);

  // Optional: if nothing loaded, set error
  if (!finished && products.length === 0) {
    setError("⚠️ Failed to load products. Please try again.");
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
