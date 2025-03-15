import React from "react";
import RegisterForm from "../../RegisterForm";

function Register(props) {
    const supabase = props.sender;
    const setUsers = props.setUsers;
    const addUser = props.action;
    return (
        <RegisterForm sender={supabase} setUsers={setUsers} action={addUser}/>
    )
}

export default Register;