import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

// just like useNavigate
const SearchContext = createContext();

// const [auth, setAuth] = useState({
//     user:null,
//     token:""
// })

const SearchProvider = ({ children }) => {
  // GLOBAL STATE
  const [auth, setAuth] = useState({
    // user: null,
    // token: "",
    keyword: "",
    results: [],
  });

  //   // default axios
  //   axios.defaults.headers.common["Authorization"] = auth?.token;

  //   useEffect(() => {
  //     const data = localStorage.getItem("auth");
  //     if (data) {
  //       const parseData = JSON.parse(data);
  //       setAuth({
  //         ...auth,
  //         user: parseData.user,
  //         token: parseData.token,
  //       });
  //     }
  //     //eslint-disable-next-line
  //   }, []);

  // useEffect(() => {
  //   console.log(auth);
  // }, []);

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

// custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
