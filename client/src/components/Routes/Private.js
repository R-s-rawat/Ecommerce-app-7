import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);

  // destructuring CONTEXT_API VARIABLES
  const [auth, setAuth] = useAuth();

  useEffect(() => {}, []);

  return ok ? <Outlet /> : "spinner";
}
