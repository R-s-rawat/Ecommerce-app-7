import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Menu/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const API =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API
      : "http://localhost:8080";

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);

  /* ─────────── Fetch categories ─────────── */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/category/get-category`);
        if (data?.success) setCategories(data.category);
        else toast.error(data?.message || "Couldn’t load categories");
      } catch (err) {
        console.error(err);
        toast.error("Error loading categories");
      }
    })();
  }, []);

  /* ─────────── Create product ─────────── */
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!category) return toast.error("Please choose a category");

    try {
      const form = new FormData();
      form.append("name", name.trim());
      form.append("description", description.trim());
      form.append("price", price);
      form.append("quantity", quantity);
      if (photo) form.append("photo", photo);
      form.append("category", category);          // <- now a valid _id
      form.append("shipping", shipping);          // boolean

      const { data } = await axios.post(
        `${API}/api/v1/product/create-product`,
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data?.success) {
        toast.success("Product created");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (err) {
    //  console.error(err.response.data.error); // that's the catch
      //  toast.error(err.message ) // Request failed with status code 500
    toast.error(err?.response?.data?.error);
    }
  };

  return (
    <Layout title="Dashboard - Create Product">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3"><AdminMenu /></div>

          <div className="col-md-9">
            <h1>Create product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                // onChange={(value)=>setCategory(value)}
                 onChange={setCategory}
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

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

              <div class="mb-3">
                {photo && (
                  <div className="mb-3 text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="preview"
                      height={200}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

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

              <Select
                bordered={false}
                placeholder="Select shipping"
                size="large"
                className="form-select mb-3"
                onChange={(val) => setShipping(val)}
              >
                <Option value={false}>No</Option>
                <Option value={true}>Yes</Option>
              </Select>

              <button className="btn btn-primary" onClick={handleCreate}>
                CREATE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
