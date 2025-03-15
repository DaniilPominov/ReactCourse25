import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <nav>
            <Link to="/">Main</Link>
            <Link to="/catalog">Catalog</Link>
            <Link to="/cart">Cart</Link>
        </nav>
    )
}

export default Header;