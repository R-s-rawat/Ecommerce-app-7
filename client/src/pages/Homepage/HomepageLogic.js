import { useState, useRef } from "react";
import axios from "axios";

export const useHomepageLogic = () => {
  const API =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API
      : "http://localhost:8080";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filteredTotal, setFilteredTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sortPriceRadio, setSortPriceRadio] = useState("newestfirst");
  const sortRef = useRef("newestfirst");

  const getAllCategories = async (setCategories) => {
    try {
      const { data } = await axios.get(`${API}/api/v1/category/get-category`);
      setCategories(data?.category || []);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

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
    try {
      let sortingObject = { createdAt: -1 };
      if (sortRef.current === "pricehightolow") sortingObject = { price: -1 };
      if (sortRef.current === "pricelowtohigh") sortingObject = { price: 1 };

      setLoading(true);
      const { data } = await axios.post(
        `${API}/api/v1/product/product-filters`,
        {
          checked,
          radio,
          page,
          sortingObject,
        }
      );

      // if (append) {
      //   setProducts((prev) => [...prev, ...data?.products]);
      // } else {
      //   setProducts(data?.products || []);
      // }

      if (append) {
        console.log("Append:", append); // If append = true (correct) && // Load more → Add to old list
        const newProducts = Array.isArray(data?.filteredProducts)
          ? data.filteredProducts
          : [];
        setProducts((prev) => [...prev, ...newProducts]);
      } else {
        console.log("Append:", append); // If append = false (correct) && // Filters/sort changed → New list
        setProducts(
          Array.isArray(data?.filteredProducts) ? data.filteredProducts : []
        );
      }

      if (setFilteredTotal) {
        setFilteredTotal(data?.filteredTotal || 0);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching filtered products:", err);
      setLoading(false);
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
  };
};
