import './App.css'
import Welcome from './components/Welcome'
import Form from './components/Form'
import Counter from './components/Counter'
import { useState, useEffect, useRef, useMemo, useCallback, useReducer } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://hpmhyralktwwihmildvx.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbWh5cmFsa3R3d2lobWlsZHZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NTY0MzMsImV4cCI6MjA1NzQzMjQzM30.mkT475IoKMFHzHEH_WoOhzBh4_NBlwHn598Jc53piqI";
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
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const inputRef = useRef(null);
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

  const addUser = useCallback(async () => {
    if (!name) return;

    try {
      const {data, error} = await supabase.from("users").insert([{ name }]).select();
      if (error) 
        console.error(error);
      else {
        if (data && data.length > 0) {
          setUsers((prevUsers) => [...prevUsers, data[0]]);
        }
        setName("");
        inputRef.current.focus();
      }
    }
      catch (err) {
        console.error("Ошибка добавления пользователя:", err);
      }
    }, [name]);
  
    const userCount = useMemo (() => users.length, [users])

  return (
    <>
    <div>
        <h1>React Hooks</h1>
        <div className="input-container">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter name"
          value="name"
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addUser}>Add User</button>
        </div>
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
