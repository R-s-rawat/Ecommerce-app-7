import { useState, useContext, createContext } from "react";

// just like useNavigate
const AuthContext = createContext();

// const [auth, setAuth] = useState({
//     user:null,
//     token:""
// })

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  return (
    <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
