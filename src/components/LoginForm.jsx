import { useState, useEffect, useRef, useMemo, useCallback, useReducer } from 'react'
import bcrypt from "bcryptjs";
import './RegisterForm.css';
function LoginForm(props){
    const supabase = props.sender;
    const [name, setName] = useState("");
    const inputRef = useRef(0);
    const passRef = useRef(0);
    const [password, setPassword] = useState("");

    const setUser = props.setCurrentUser;
    const  GetUser = async (e) =>{
        e.preventDefault();
        try{
        const myHash = password;//bcrypt.hashSync(password, 10);
        const {data, error} = await supabase.from('users')
        .select('*')
        .eq('name', name)
        .eq('hashedPassword', myHash)
        .single();
        
        if (error) 
            console.error(error);

        else{
                inputRef.current.className = "form-input-succces";
            }
        }
        catch (err) {
            console.error("Ошибка добавления пользователя:", err);
          }
        
        
        setUser(data);
    }
    //bcrypt.compareSync(myHash, serverHash);
    return(
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
        <button onClick={GetUser}>log in</button>
        </div>
        </form>
    )
}
export default LoginForm;