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
 //     const {data, error} = await supabase.from("users").insert({ name });
    }
  });
  return (
    <>
    <div>
        <Welcome name={"World"}/>
    </div>
    <div>
        <Counter/>

    </div>
    <div>
        <Form/>
        
    </div>

 
</>
  )
}

export default App
