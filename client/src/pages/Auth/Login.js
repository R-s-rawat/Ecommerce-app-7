import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
// no authStyles.css (automatically working css without import)
import { useAuth } from "../../context/auth";

const Login = () => {
  // useState - 1st getter function, 2nd setter function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  // form function,
  //
  // targeting e(event)

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    // console.log(name,email,password,phone,address)
    // toast.success('Registered Successfully')
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      // Now, if (true)
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res ? res.data.message : "login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"login page"}>
      {/* <h1>Register Page</h1> */}
      <div className="form-container">
        {" "}
        {/*simple sover design using css for forms */}
        <h1>Login Page</h1>
        {/* paste form from bootstrap-5 docs && then convert HTML to JSX*/}
        <form onSubmit={handleSubmit}>
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
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
