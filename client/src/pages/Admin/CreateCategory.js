import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Menu/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";

const CreateCategory = () => {
  const API =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API
      : "http://localhost:8080";

  //  have an empty array for storing multiple values
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/category/get-category`);
      console.log(data);
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  // handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        // toast.success(`${data.name} is created`);
         toast.success(`${name} is created`);
        getAllCategory()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  // for showing fetched categories
  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            {/* <h1>Create category</h1> */}
            <h1>Manage category</h1>
            <div className="p-3 w-50">
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button className="btn btn-primary">Edit</button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
