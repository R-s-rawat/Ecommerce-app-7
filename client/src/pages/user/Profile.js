import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Menu/UserMenu";

const Profile = () => {
  return (
    <Layout title={"Your profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>Your profile</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
