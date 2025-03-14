import React from 'react';
import { useState, useEffect, useRef, useMemo, useCallback, useReducer } from 'react'

import './RegisterForm.css';
function RegisterForm(props){
    const supabase = props.sender;
    const [name, setName] = useState("");
    const inputRef = useRef(0);
    const passRef = useRef(0);
    const setUsers = props.setUsers;
    const [password, setPassword] = useState("");
    const addUser = props.action;
    
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
        <button onClick={(e) => {
          e.preventDefault();
          addUser(name,password);
        setName("");
        setPassword("");
        inputRef.current.focus();
        passRef.current.focus();
        }}>Add User</button>
        </div>
        </form>
    )
}
export default RegisterForm;