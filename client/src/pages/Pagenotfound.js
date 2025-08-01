// import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const Pagenotfound = () => {
  return (
    // <Layout>
    //     <h1>Page not found</h1>
    // </Layout>
    <Layout title={"go back- page not found"}>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        <Link to="/" className="pnf-btn">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
