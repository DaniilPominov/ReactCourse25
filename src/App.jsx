import './App.css'
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect, useRef, useMemo, useCallback, useReducer } from 'react'

import { createClient } from '@supabase/supabase-js'
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { Route, Routes, Outlet } from 'react-router-dom';
import Cart from './components/OnlineStore/Cart';
import Catalog from './components/OnlineStore/Catalog';
import Header from './components/OnlineStore/Header';
import Footer from './components/OnlineStore/Footer';
import Home from './components/OnlineStore/Home';
import Product from './components/OnlineStore/Product';
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

  const addUser = async (name,password) => {
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
        
      }
    }
      catch (err) {
        console.error("Ошибка добавления пользователя:", err);
      }
    };
  const  GetUser = async (name,password) =>{
    try{;
    const {data, error} = await supabase.from('users')
    .select('*')
    .eq('name', name)
    .single();
    
    
    if (error) 
        console.error(error);

    else{
            const storedHash = data.hashedPassword;
            if(storedHash){
              if(bcrypt.compareSync(password, storedHash)){
                return data;
              }
            }
            return;
        }
    }
    catch (err) {
        console.error("Ошибка добавления пользователя:", err);
      }
      
  }


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

  const Layout = () => {
    return (
      <>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </>
    );
  };

  return (
    <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="catalog" element={<Catalog />}/>
            <Route path="cart" element={<Cart />}/>
            <Route path="home" element={<Home />}/>
            <Route path="product/:id" element={<Product />}/>
          </Route>
        </Routes>
    </>
  )
}

export default App
