// import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Menu/AdminMenu";

const AdminUsers = () => {
  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Add users</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminUsers;
