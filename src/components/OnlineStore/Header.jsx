import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StyleContext } from "./StyleProvider";
import "../../styles/Header.scss";

function Header() {
  const { theme, changeTheme } = useContext(StyleContext);
  
  return (
    <header className={`header ${theme}-theme`}>
      <div className="header-content container">
        <h1 className="logo">Online Store</h1>
        
        <nav className="main-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/catalog" className="nav-link">Catalog</Link>
          <Link to="/cart" className="nav-link">Cart</Link>
        </nav>

        <div className="controls">
          <button 
            onClick={changeTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌞' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;