import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const API =
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_API
        : "http://localhost:8080";

    const getCategories = async () => {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Request timed out after 60 seconds"));
        }, 60000);
      });

      try {
        const response = await Promise.race([
          axios.get(`${API}/api/v1/category/get-category`, {
            signal: controller.signal,
          }),
          timeoutPromise,
        ]);

        const data = response?.data;
        const catData = data?.category;

        setCategories(Array.isArray(catData) ? catData : []);
        setCategoryError(null);
      } catch (error) {
        if (
          error.name === "CanceledError" ||
          error.message.includes("timed out")
        ) {
          console.warn("Category fetch aborted due to timeout.");
          setCategoryError("⚠️ Failed to load categories. Please try again.");
        } else if (
          error.message === "Network Error" ||
          error.message.includes("Network") ||
          error.message.includes("CORS")
        ) {
          setCategoryError(
            "⚠️ Network or CORS issue. Please check server or permissions."
          );
        } else {
          console.error("Error fetching categories:", error);
          setCategoryError("⚠️ Failed to load categories. Please try again.");
        }
      } finally {
        setLoadingCategories(false);
      }
    };

    getCategories();

    return () => {
      controller.abort();
    };
  }, []);

  return {
    categories: Array.isArray(categories) ? categories : [],
    loadingCategories,
    categoryError,
  };
}
