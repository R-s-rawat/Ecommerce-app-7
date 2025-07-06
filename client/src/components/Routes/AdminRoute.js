import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import axios from "axios";

export default function AdminRoute() {
  const API =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API
      : "http://localhost:8080";

  const [ok, setOk] = useState(false);

  // destructuring CONTEXT_API VARIABLES
  const [auth, setAuth] = useAuth();

  // get token to send while making requests (full-proof and more robust then context)
  const authToken = JSON.parse(localStorage.getItem("auth"));
const token = authToken?.token;

  useEffect(() => {
    const authCheck = async () => {
      console.log(token)
      const res = await axios.get(`${API}/api/v1/auth/admin-auth`,{
  headers: {
    Authorization: `Bearer ${token}`, // token = "your-jwt-token"
  },
});
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
    
  }, [auth?.token]);

    // ✅ NEW: Prevent normal users from accessing admin routes (redirect user back to user)
  if (ok && auth?.user?.role !== 1) {
  return <Navigate to="/dashboard/user" />;
}

  return ok ? <Outlet /> : <Spinner path="" />;
}
