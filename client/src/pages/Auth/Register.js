import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
// import "../../styles/AuthStyles.css";

const Register = () => {
  const API =
    process.env.NODE_ENV === "production" ? process.env.REACT_APP_API : "";

  // useState - 1st getter function, 2nd setter function
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  // form function,
  //
  // targeting e(event)

  const handleSubmit = async (e) => {
    // console.log(e);
    e.preventDefault();
    // console.log(name,email,password,phone,address)
    // toast.success('Registered Successfully')
    try {
      // import.meta.env.VITE_BACKEND_URL
      // const res = await axios.post("/api/v1/auth/register", {
      const res = await axios.post(`${API}/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
      });
      // Now, if (true)
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res ? res.data.message : "register");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"register page"}>
      {/* <h1>Register Page</h1> */}
      <div className="form-container">
        {" "}
        {/*simple sover design using css for forms */}
        <h1>Register Page</h1>
        {/* paste form from bootstrap-5 docs && then convert HTML to JSX*/}
        <form onSubmit={handleSubmit}>
          {/* for name */}
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your Name"
              required
            />
          </div>
          {/* for email */}
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your Email"
              required
            />
          </div>
          {/* for password */}
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your Password"
              required
            />
          </div>
          {/* for phone number */}
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your Phone"
              required
            />
          </div>
          {/* for address */}
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your Address"
              required
            />
          </div>
          {/* <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div> */}
          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
