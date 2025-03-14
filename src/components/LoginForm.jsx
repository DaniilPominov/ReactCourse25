import { useState, useEffect, useRef, useMemo, useCallback, useReducer } from 'react'
import './RegisterForm.css';
function LoginForm(props){
    const supabase = props.sender;
    const [name, setName] = useState("");
    const inputRef = useRef(0);
    const passRef = useRef(0);
    const [password, setPassword] = useState("");
    const LoginUser = props.action;

    const setUser = props.setCurrentUser;
    
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
        <button onClick={async (e)=>{
            e.preventDefault();
            const user = await LoginUser(name, password);
            if(user){
                inputRef.current.className = "form-input-succces";
                setUser(user);
            }
            
        }}>log in</button>
        </div>
        </form>
    )
}
export default LoginForm;