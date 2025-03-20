import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StyleContext } from "./StyleProvider";
import "../../styles/theme-styles.css"; 

function Header() {
    const {theme, changeTheme} = useContext(StyleContext);
    return (
        <header className={`header ${theme}-theme`}>
            <h1>Online Store</h1>
            <button onClick={() => changeTheme()}>Toggle Theme</button>

            <nav>
            <Link to="/">Main</Link>
            <Link to="/catalog">Catalog</Link>
            <Link to="/cart">Cart</Link>
            </nav>
        </header>
        
    )
}

export default Header;