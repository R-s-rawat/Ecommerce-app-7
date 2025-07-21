import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //get cat
  const getCategories = async () => {

    const API =
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_API
        : "http://localhost:8080";

    try {
      const { data } = await axios.get(`${API}/api/v1/category/get-category`);
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // send categories state
  return categories;
}
