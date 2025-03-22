import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          © 2025 PetShop. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;