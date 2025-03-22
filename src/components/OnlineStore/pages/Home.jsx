import React, { useContext } from "react";
import { StyleContext } from "../StyleProvider";
import '../../../styles/Home.scss';

function Home() {
    const {theme} = useContext(StyleContext);
    return (
        <div class={`${theme}-theme`}>
            <h1>Welcome to PetShop!</h1>
            <p>Here you can find all the best for your pet!</p>
        </div>
    )
}

export default Home;