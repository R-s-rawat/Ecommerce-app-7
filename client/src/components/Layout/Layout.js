import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
// import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

// // for app.js content to work in b/w this content tags, like <h1> between <layout></layout>, pass {props} to LAYOUT and print {props.children}

// const Layout = (props) => {
//   return (
//     <div>
//         <Header/>
//          <main>{props.children}</main>
//          {/* anything else you want on the Layout */}
//          <Footer/>
//     </div>
//   )
// }

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        {/* <ToastContainer /> */}
        <Toaster />
        {children}
      </main>
      {/* anything else you want on the Layout */}
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce app",
  description: "Shop best products online with ease",
  keywords: "buy,shop,purchase",
  author: "rohit",
};

export default Layout;
