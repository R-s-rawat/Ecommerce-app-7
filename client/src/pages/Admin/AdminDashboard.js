import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Menu/AdminMenu";

const AdminDashboard = () => {
  return (
    <Layout>
      {/* <h1>Admin Dashboard</h1> */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">Content</div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
