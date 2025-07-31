import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Menu/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";

const Profile = () => {
  const API =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API
      : "http://localhost:8080";

  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  // const [answer, setAnswer] = useState("");

  // context
  const [auth, setAuth] = useAuth();

  // get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
    setPassword(password);
    //✅ This works only if auth?.user is always truthy.
    //❗ If auth.user is null or still loading, destructuring will throw an error.
  }, [auth?.user]);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post(`${API}/api/v1/auth/register`, {
      const { data } = await axios.put(`${API}/api/v1/auth/profile`, {
        name,
        email,
        password,
        phone,
        address,
        //answer,
      });
      // check for errors then consume response
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser }); //👈 context api will store user
        //also store in LOCAL-STORAGE,, but firstly parse data, as we have two objects
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile udpated successfully");
      }
      // Now, if (true)
      // if (res && res.data.success) {
      //   toast.success(res.data.message);
      //   navigate("/login");
      // } else {
      //   toast.error(res ? res.data.message : "register");
      // }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Your profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            {/* <h1>Your profile</h1> */}
            {/* have the form - form begins*/}
            <div className="form-container">
              {" "}
              {/*simple sover design using css for forms */}
              <h1>User Profile</h1>
              {/* paste form from bootstrap-5 docs && then convert HTML to JSX*/}
              <form onSubmit={handleSubmit}>
                {/* for name */}
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Enter your Name"
                  />
                </div>
                {/* for email */}
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Enter your Email"
                    disabled
                  />
                </div>
                {/* for password */}
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter your Password"
                  />
                </div>
                {/* for phone number */}
                <div className="mb-3">
                  <input
                    type="numeric"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    placeholder="Enter your Phone"
                  />
                </div>
                {/* for address */}
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    placeholder="Enter your Address"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
            {/* form ends */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
