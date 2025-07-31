import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, Navigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import axios from "axios";

export default function PrivateRoute() {
  const API =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API
      : "http://localhost:8080";

  const [ok, setOk] = useState(null); // Track loading state
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(`${API}/api/v1/auth/user-auth`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        if (res.data.ok && auth?.user?.role === 0) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        setOk(false);
      }
    };

    if (auth?.token) authCheck();
    else setOk(false);
  }, [auth?.token, auth?.user]);

  // // ⏳ While loading
  // if (ok === null) return <Spinner />;

  // // ❌ Not a regular user (either unauthenticated or admin)
  // if (!ok) return <Navigate to="/" />;

  // // ✅ Authorized user
  // return <Outlet />;

  // ✅ NEW: Prevent admin users from accessing user routes (redirect admin back to admin)
  if (ok && auth?.user?.role !== 0) {
    return <Navigate to="/dashboard/admin" />;
  }

  return ok ? <Outlet /> : <Spinner path="" />;
}
