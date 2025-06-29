import React from "react";
import Layout from "../components/Layout/Layout";
//  custom hook import created for CONTEXT API
import { useAuth } from "../context/auth";

const HomePage = () => {
  // get values from CONTEXT API
  const [auth, setAuth] = useAuth();

  return (
    <Layout title={"Home - Ecommerce"}>
      <h1>Home page</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default HomePage;
