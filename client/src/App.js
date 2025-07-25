import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage/HomePage";
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
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import AdminUsers from "./pages/Admin/AdminUsers";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";

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

        {/* child🐇🐇 special pages */}
        <Route path="/search" element={<Search />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/product/:slug" element={<ProductDetails />} />

        {/* child🐇🐇 - forms pages */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* child🐇🐇 pages - not created */}
        <Route path="*" element={<Pagenotfound />} />

        {/* child🐇🐇 protected user dashboard pages */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>

        {/* child🐇🐇 protected admin dashboard pages */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />/
          <Route path="admin/product/:slug" element={<UpdateProduct />} />/
          <Route path="admin/users" element={<AdminUsers />} />/
          <Route path="admin/products" element={<Products />} />/
        </Route>
      </Routes>
    </>
  );
}

// notes: private protected routes will be done later

export default App;
