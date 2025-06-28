import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import axios from "axios";

export default function PrivateRoute() {
  const API =
    process.env.NODE_ENV === "production" ? process.env.REACT_APP_API : "";

  const [ok, setOk] = useState(false);

  // destructuring CONTEXT_API VARIABLES
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${API}/api/v1/auth/user-auth`);
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner/>;
}
