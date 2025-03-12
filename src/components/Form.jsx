import React from "react";
import FocusInput from "./FocusInput";

function Form() {
    return (
        <div>
            <h2>Форма ввода</h2>
            <FocusInput></FocusInput>
            <button onClick={() => alert("Форма заполнена!")}>Отправить</button>
        </div>
    )
}

export default Form;
