import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Menu/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const API =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API
      : "http://localhost:8080";

  // states
  const [products, setProducts] = useState([]);

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/product/get-product`);
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while getting products");
    }
  };

  // lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products list</h1>
          <div className="d-flex">
            {products?.map((p) => (
              <Link
                key={p?._id}
                to={`/dashboard/admin/product/${p?.slug}`}
                className="product-link"
              >
                <div className="card m-2 product-card" style={{ width: "18rem" }}>
                  <img
                    src={`${API}/api/v1/product/product-photo/${p?._id}`}
                    className="card-img-top product-img"
                    alt={p?.name}
                  />
                  <div className="card-body ">
                    <h5 className="card-title">{p?.name}</h5>
                    <p className="card-text">{p?.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
