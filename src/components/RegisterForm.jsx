import React from 'react';
import { useState, useEffect, useRef, useMemo, useCallback, useReducer } from 'react'
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import './RegisterForm.css';
function RegisterForm(props){
    const supabase = props.sender;
    const [name, setName] = useState("");
    const inputRef = useRef(0);
    const passRef = useRef(0);
    const setUsers = props.setUsers;
    const [password, setPassword] = useState("");
    const addUser = useCallback(async (e) => {
        e.preventDefault();
        if(!name) return;
        try {
            const hashedPassword = bcrypt.hashSync(password, 10);
          // Insert user into the database
          const {data, error} = await supabase.from("users").insert([{id:uuidv4(),name:name,hashedPassword:hashedPassword}]).select();
          if (error) 
            console.error(error);
          else {
            if (data && data.length > 0) {
              setUsers((prevUsers) => [...prevUsers, data[0]]);
            }
            setName("");
            setPassword("");
            inputRef.current.focus();
            passRef.current.focus();
          }
        }
          catch (err) {
            console.error("Ошибка добавления пользователя:", err);
          }
        }, [name]);

    return (
        <form className='register-form'>
            <div className="input-container">
        <input
          ref={inputRef}
          type="text"
          value = {name}
          placeholder="Enter name"
          className='form-input'
          onChange={(e) => {
            e.preventDefault();
            setName(e.target.value)}}
        />
        <input
        ref={passRef}
        type="password"
        value = {password}
        placeholder="Enter password"
        className='form-input'
        onChange={(e) => {
            e.preventDefault();
            setPassword(e.target.value)}}
        />
        <button onClick={addUser}>Add User</button>
        </div>
        </form>
    )
}
export default RegisterForm;