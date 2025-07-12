import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
//  custom hook import created for CONTEXT API
import { useAuth } from "../context/auth";
import axios from "axios";

const HomePage = () => {
  const API =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API
      : "http://localhost:8080";

  // get values from CONTEXT API
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // GET ALL PRODUCTS
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/product/get-product`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  {
    /* -------------------------------- return jsx ------------------ */
  }
  return (
    <Layout title={"Home - Ecommerce"}>
      {/* <h1>Home page</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre> */}
      <div className="row mt-3">
        <div className="col-md-3">
          <h4 className="text-center">Filter by category</h4>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All products</h1>
          <div className="d-flex flex-wrap">
            {/* <h1>Products</h1> */}
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${API}/api/v1/product/product-photo/${p?._id}`}
                  className="card-img-top"
                  alt={p?.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p?.name}</h5>
                  <p className="card-text">{p?.description}</p>
                   <button class="btn btn-primary ms-1">More details</button>
                   <button class="btn btn-secondary ms-1">Add to cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
