import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
// import { ToastContainer } from "react-toastify";
// import "../../styles/AuthStyles.css"; // outside of directory
import "./styles/AuthStyles.css";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";

function App() {
  return (
    <>
      <Routes>
        {/* main page - Parent👿👿 */}
        <Route path="/" element={<HomePage />} />
        {/* child🐇🐇 pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        {/* child🐇🐇 protected pages */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        {/* child🐇🐇 - forms pages */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* child🐇🐇 pages - not created */}
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

// notes: private protected routes will be done later

export default App;
