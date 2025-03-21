import { useState, useEffect, useRef, useMemo, useCallback, useReducer, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './OnlineStore/AuthContext';
import './RegisterForm.css';
function LoginForm(props){
    const supabase = props.sender;
    const [name, setName] = useState("");
    const inputRef = useRef(0);
    const passRef = useRef(0);
    const [password, setPassword] = useState("");
    const LoginUser = props.action;
    const {isAuth, setAuth} = useContext(AuthContext);
    let navigate = useNavigate();

    const setUser = props.setCurrentUser;
    const handleLogin = async (e) => {
        
        e.preventDefault();
        try {
            const user = await LoginUser(name, password);
            if(user){
                inputRef.current.className = "form-input-succces";       
                setAuth(true);         
                setUser(user);
                navigate('/home');
            }
            else {
                setUser(null);
                navigate('/')
            }
        } catch (e) {
            console.error(e);
            navigate('/');
        }
    }
    //bcrypt.compareSync(myHash, serverHash);
    return(
        <form className='login-form'>
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
            handleLogin(e);    
        }}>log in</button>
        </div>
        </form>
    )
}
export default LoginForm;