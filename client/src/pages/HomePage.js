import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Filters/Prices";

const HomePage = () => {
  const API =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API
      : "http://localhost:8080";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  // GET ALL PRODUCTS
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/product/get-product`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/category/get-category`);
      console.log(data);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // get filtered products
  const getFilteredProducts = async () => {
    try {
      // pass values to the network request (as we are passing(values), so post... request)
      const { data } = await axios.post(
        `${API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      console.log(products)
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Lifecycle method - categories || get
  useEffect(() => {
    getAllCategory();
  }, []);

  // Lifecycle method - products || get
  // useEffect(() => {
  //   getAllProducts();
  // }, []);
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

   // Lifecycle method , getAllProducts is running only in initial (and only if no filter(cat,price) being used)
  useEffect(() => {
    if(checked.length || radio.length) getFilteredProducts()
  }, [checked, radio]);
  {
    /* -------------------------------- return jsx ------------------ */
  }
  return (
    <Layout title={"Home - Ecommerce"}>
      {/* <h1>Home page</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre> */}
      <div className="row mt-3">
        <div className="col-md-2">
          {/* category filter */}
          <h4 className="text-center">Filter by category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter by price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
        </div>
        <div className="col-md-9">
          {JSON.stringify(checked, null, 4)}
          {JSON.stringify(radio, null, 4)}
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
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text"> $ {p.price}</p>
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
