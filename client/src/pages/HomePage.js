import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../data/Prices";

const HomePage = () => {
  const API =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API
      : "http://localhost:8080";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  // pagination states
  const [total, setTotal] =useState(0);
  const [page, setPage] =useState(1);
  // for pagination loader logic
  const [loading, setLoading] = useState(false);

  // GET ALL PRODUCTS
  const getAllProducts = async () => {
    try {
      setLoading(true)
      // const { data } = await axios.get(`${API}/api/v1/product/get-product`);
       const { data } = await axios.get(`${API}/api/v1/product/product-list/${page}`);
       console.log('products on first fetch',data)
      // remove the products pagination loader - begin
      setLoading(false)
      // remove the products pagination loader - end
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      // pagination loader logic - (as try block set the loader to true)
      setLoading(false);
    }
  };

  // GET ALL CATEGORIES
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/category/get-category`);
      // console.log(data);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Category filter(due to multiple categories, push categories) - much of a utility function
  const handleCatFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // Get filtered products (utilizing both (price,cats))
  const getFilteredProducts = async () => {
    try {
      // pass values to the network request (as we are passing(values), so post... request)
      console.log("Sending filters to backend:", { checked, radio });
      const { data } = await axios.post(
        `${API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      //console.log(data.products)
      setProducts(data?.filteredProducts);
    } catch (error) {
      console.log(error);
    }
  };

// Get total created products count 
const getTotalCreatedProductsCount = async() => {
  try {
    const {data} = await axios.get(`${API}/api/v1/product/product-count`)
    console.log('total created products count in db', data);
    setTotal(data?.total)
  } catch (error) {
    console.log(error)
  }
}

// load more(for loading more products on button press) - much of a utility function(not a network request(res) function)
// const loadMore = async() => {
//   try {
//     setLoading(true);
//     const {data} = await axios.get(`${API}/api/v1/product/product-list/${page}`);
//      console.log('products after initial fetch on load more',data)
//      // remove the products pagination loader - begin
//     setLoading(false);
//      // remove the products pagination loader - end
//     setProducts([...products, ...data?.products])
//   } catch (error) {
//     console.log(error)
//     // pagination loader logic - (as try block set the loader to true)
//     setLoading(false)
//   }
// }

const loadMore = async () => {
  try {
    setLoading(true);

    if (checked.length || radio.length) {
      // If filters are active, send them with pagination
      const { data } = await axios.post(`${API}/api/v1/product/product-filters`, {
        checked,
        radio,
        page,
      });
      setProducts([...products, ...data.filteredProducts]);
    } else {
      // No filters? Load next page normally
      const { data } = await axios.get(`${API}/api/v1/product/product-list/${page}`);
      setProducts([...products, ...data.products]);
    }

    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};


  // Lifecycle method - categories || get (fetch all categories on initial load to save categories - for listing in ui)
  useEffect(() => {
    getAllCategory();
  }, []);

  // Lifecycle method - products || get
  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  {
    /*useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);*/
  }

  // Lifecycle method , getAllProducts is running only in initial (and only if no filter(cat,price) being used)
  // useEffect(() => {
  //   if(checked.length || radio.length) getFilteredProducts()
  // }, [checked, radio]);

  //Lifecycle method - Load all products only if no filters are applied (else get filtered products)
  useEffect(() => {
    if (!checked.length && !radio.length) {
      getAllProducts();
    } else {
      getFilteredProducts();
    }
  }, [checked, radio]);

// Lifecycle method - get Total Created Products Count
useEffect(()=>{
getTotalCreatedProductsCount();
},[])

// Lifecycle method - Load more (based on all products) - if page > 1;
useEffect(()=>{
 if (page === 1) return;
 loadMore();
},[page])

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
                onChange={(e) => handleCatFilter(e.target.checked, c._id)}
                checked={checked.includes(c._id)} // <- Control the checked state✅(make it fully controlled)
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter by price</h4>
          <div className="d-flex flex-column">
            <Radio.Group 
            onChange={(e) => setRadio(e.target.value)}
              value={radio} // // <- Control the value✅(make it fully controlled)
            >
              {Prices.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          {/* Reset Filters button */}
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => {
                setChecked([]);
                setRadio([]);
              }}
            >
              Reset Filters
            </button>
          </div>

          {/* <h4 className="text-center mt-4">Filter by price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div> */}
        </div>
        <div className="col-md-9">
          {/* {JSON.stringify(checked, null, 4)}
          {JSON.stringify(radio, null, 4)} */}
          <h1 className="text-center">All products</h1>
          <div className="d-flex flex-wrap">
            {/* <h1>Products</h1> */}
            {products?.map((p) => (
              <div className="card m-2 product-card" style={{ width: "18rem" }}>
                <img
                  src={`${API}/api/v1/product/product-photo/${p?._id}`}
                  className="card-img-top product-img"
                  alt={p?.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text"> $ {p.price}</p>
                  <button className="btn btn-primary ms-1">More details</button>
                  <button className="btn btn-secondary ms-1">
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {/* {total} */}
            {products && products.length < total && (
              <button
              className="btn btn-warning"
              onClick={(e)=>{
                e.preventDefault();
                setPage(page +1);
              }}
              >
                {loading? "Loading..." : "Load more"}
              </button>
            ) }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
