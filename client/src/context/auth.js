import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

// just like useNavigate
const AuthContext = createContext();

// const [auth, setAuth] = useState({
//     user:null,
//     token:""
// })

const AuthProvider = ({ children }) => {
  // GLOBAL STATE
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    //eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   console.log(auth);
  // }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
