// import React from "react";
import { Link } from "react-router-dom";
import "../../styles/FooterStyles.css";

const Footer = () => {
  return (
    // <h1>Footer comp</h1>
    <div className="footer">
      <h4 className="text-center">All rights reserved &copy; E-comm</h4>
      {/* p.text-center.mt-3 */}
      <p className="text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
