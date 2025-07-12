import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Menu/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
  // ───────────────────────────────── API URL
  const API =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API
      : "http://localhost:8080";

  const navigate = useNavigate();
  const { slug } = useParams();              

  /* ─────────── component state ─────────── */
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");   // 🔄 _id string
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [id, setId] = useState("");               // product _id

  /* ─────────── initial data fetch (both endpoints) ─────────── */
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          axios.get(`${API}/api/v1/category/get-category`),
          axios.get(`${API}/api/v1/product/get-product/${slug}`),
        ]);

        /* categories */
        if (catRes.data?.success) {
          setCategories(catRes.data.category);
        } else {
          toast.error(catRes.data?.message || "Couldn’t load categories");
        }

        /* single product */
        const product = prodRes.data?.product;
        if (product) {
          setName(product.name);
          setId(product._id);
          setDescription(product.description);
          setPrice(product.price);
          setQuantity(product.quantity);
          setShipping(product.shipping);
          setCategory(product.category?._id || "");  // 🔄 only the ID
        }
      } catch (err) {
        console.error(err);
        toast.error("Error loading data");
      }
    };

    fetchInitialData();
  }, [API, slug]);

  /* ─────────── update product ─────────── */
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!category) return toast.error("Please choose a category");

    try {
      const form = new FormData();
      form.append("name", name.trim());
      form.append("description", description.trim());
      form.append("price", price);
      form.append("quantity", quantity);
      if (photo) form.append("photo", photo);
      form.append("category", category);    // now a valid _id
      form.append("shipping", shipping);

      const { data } = await axios.put(
        `${API}/api/v1/product/update-product/${id}`,
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data.success) {
        toast.success("Product updated");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(err?.response?.data?.error || "Update failed");
      console.error(err);
    }
  };

   /* ─────────── delete product ─────────── */
   const handleDelete = async()=>{
    try {
        let answer = window.confirm('Do you want to delete product?')
        if(!answer) return;
        const {data} = axios.delete(`${API}/api/v1/product/delete-product/${id}`)
        toast.success('Product deleted successfully')
        navigate('/dashboard/admin/products/')
    } catch (error) {
        console.log(error);
        toast.error('Deletion failed sadly')
    }
   }

  return (
    <Layout title="Dashboard - Update Product">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1>Update product</h1>
            <div className="m-1 w-75">

              {/* ---------- Category ---------- */}
              <Select
                placeholder="Select a category"
                size="large"
                className="form-select mb-3"
                value={category}              // 🔄 string _id
                onChange={setCategory}
                showSearch
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              {/* ---------- Photo upload ---------- */}
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload photo"}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </label>
              </div>

              {/* ---------- Photo preview ---------- */}
              <div className="mb-3 text-center">
                {photo ? (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="preview"
                    height={200}
                    className="img img-responsive"
                  />
                ) : (
                  id && (
                    <img
                      src={`${API}/api/v1/product/product-photo/${id}`}
                      alt="preview"
                      height={200}
                      className="img img-responsive"
                    />
                  )
                )}
              </div>

              {/* ---------- Text inputs ---------- */}
              <input
                type="text"
                value={name}
                placeholder="Product name"
                className="form-control mb-3"
                onChange={(e) => setName(e.target.value)}
              />

              <textarea
                value={description}
                placeholder="Description"
                className="form-control mb-3"
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="number"
                value={price}
                placeholder="Price"
                className="form-control mb-3"
                onChange={(e) => setPrice(e.target.value)}
              />

              <input
                type="number"
                value={quantity}
                placeholder="Quantity"
                className="form-control mb-3"
                onChange={(e) => setQuantity(e.target.value)}
              />

              {/* ---------- Shipping ---------- */}
              <Select
                placeholder="Select shipping"
                size="large"
                className="form-select mb-3"
                value={shipping}                // 🔄 boolean
                onChange={setShipping}
              >
                <Option value={false}>No</Option>
                <Option value={true}>Yes</Option>
              </Select>

              <button className="btn btn-primary" onClick={handleUpdate}>
                UPDATE PRODUCT
              </button>

                 <button className="btn btn-danger" onClick={handleDelete}>
                DELETE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
