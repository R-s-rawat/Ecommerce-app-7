import React from "react";
import Layout from "../../components/Layout/Layout";

const Register = () => {
  return (
    <Layout title={"register page"}>
      {/* <h1>Register Page</h1> */}
      <div className="register">
        <h1>Register Page</h1>
        {/* paste form from bootstrap-5 docs && then convert HTML to JSX*/}
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
            //   aria-describedby="emailHelp" (ARIA LABELS NOT NEEDED)
            />
            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
