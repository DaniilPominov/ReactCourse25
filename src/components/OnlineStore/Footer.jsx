import React from "react";

function Footer({children }) {
    return (
        <footer>
            <p>2025 PetShop. All rights reserved.</p>
            {children}
        </footer>
    )
}

export default Footer;