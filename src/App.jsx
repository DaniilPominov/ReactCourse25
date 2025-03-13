import './App.css'
import { useState, useEffect, useRef, useMemo, useCallback, useReducer } from 'react'
import { createClient } from '@supabase/supabase-js'
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
const supabaseUrl = "https://svgxutgdnhlkdlwscmmq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2Z3h1dGdkbmhsa2Rsd3NjbW1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NjIxNjksImV4cCI6MjA1NzQzODE2OX0.DA1gIxs7tBlYflBJPJe_niRMtV9pIIiREyxdoBmdVno";

        
const supabase = createClient(supabaseUrl, supabaseKey)

const reducer = (state, action) => {
  switch (action.type) {
    case "Increment":
      return {...state, count: state.count + 1 };
    case "Decrement":
      return {...state, count: state.count - 1 };
    default:
      return state;
  }
}
function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  const fetchUsers = useCallback(async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
    if (error) {
      console.error(error) 
    } else {
      setUsers(data)
    }
  }, []);

  useEffect(() => {
    fetchUsers().catch((error) => console.error("Ошибка обновления списка пользователей"))
  }, [fetchUsers]);

  
  
    const userCount = useMemo (() => users.length, [users])

  return (
    <>
    <div>
        <h1>React Hooks</h1>
        <RegisterForm sender={supabase} setUsers={setUsers}/>
        <h2>Try to login</h2>
        <LoginForm sender={supabase} setCurrentUser={setCurrentUser}/>
        <h2>Current User: {currentUser?.name}</h2>
        <h2>Users ({userCount}):</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
        
        <div>
          <h2>Example of useReducer</h2>
          <p>Amount: {state.count}</p>
          <button onClick={() => dispatch({ type: "Increment" })}>+</button>
          <button onClick={() => dispatch({ type: "Decrement" })}>-</button>
        </div>
    </div>

 
</>
  )
}

export default App
