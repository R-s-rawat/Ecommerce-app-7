import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
// import "../../styles/AuthStyles.css";
// import { useAuth } from "../../context/auth";

const ForgotPassword = () => {
  const API =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API
      : "http://localhost:8080";

  // useState - 1st getter function, 2nd setter function
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  // const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  //  const location = useLocation();

  // form function,
  //
  // targeting e(event)

  const handleSubmit = async (e) => {
    // console.log(e);
    e.preventDefault();
    // console.log(name,email,password,phone,address)
    // toast.success('Registered Successfully')
    try {
      // console.log("API:", API);
      const res = await axios.post(`${API}/api/v1/auth/forgot-password`, {
        email,
        newPassword,
        answer,
      });
      // Now, if (true)
      if (res && res.data.success) {
        toast.success(res.data.message);
        // setAuth({
        //   ...auth,
        //   user: res.data.user,
        //   token: res.data.token,
        // });
        // localStorage.setItem("auth", JSON.stringify(res.data));
        // navigate("/");
        // navigate(location.navigate || "/");
        navigate("/login");
      } else {
        toast.error(res ? res.data.message : "forgot passcode done");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Forgot password - Ecommerce App"}>
      {/* <h1>ForgotPassword</h1> */}
      <div className="form-container">
        {" "}
        {/*simple sover design using css for forms */}
        <h1>Reset Password Form</h1>
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
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your new password"
              required
            />
          </div>
          {/* for answer */}
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="What is your favourite sports"
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
            RESET
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
