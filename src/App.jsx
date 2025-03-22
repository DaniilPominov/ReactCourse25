import './App.css'
import { lazy, Suspense } from 'react';
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect, useRef, useMemo, useCallback, useReducer } from 'react'
import { SupabaseContext } from './components/OnlineStore/SupabaseContext'; 
import { createClient } from '@supabase/supabase-js'
import {AuthContext} from "./components/OnlineStore/AuthContext"
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import "./styles/index.css"
import { Route, Routes, Outlet } from 'react-router-dom';
import Cart from './components/OnlineStore/pages/Cart';
// import Catalog from './components/OnlineStore/pages/Catalog';
import Header from './components/OnlineStore/Header';
import Footer from './components/OnlineStore/Footer';
//import CategoryProduct from './components/OnlineStore/pages/CategoryProduct';
import Home from './components/OnlineStore/pages/Home';
//import Product from './components/OnlineStore/pages/Product';
import CartProvider from './components/OnlineStore/CartProvider';
import FeedbackFormPortal from './components/FeedbackFormPortal';
import { StyleProvider } from './components/OnlineStore/StyleProvider';


const supabaseUrl = "https://svgxutgdnhlkdlwscmmq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2Z3h1dGdkbmhsa2Rsd3NjbW1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NjIxNjksImV4cCI6MjA1NzQzODE2OX0.DA1gIxs7tBlYflBJPJe_niRMtV9pIIiREyxdoBmdVno";
const Catalog = lazy(() => import("./components/OnlineStore/pages/Catalog"))
const Product = lazy(() => delay(import("./components/OnlineStore/pages/Product")))     
const CategoryProduct = lazy(() => import("./components/OnlineStore/pages/CategoryProduct"))   
const supabase = createClient(supabaseUrl, supabaseKey)
const delay = (promise) => {
  return new Promise(resolve => setTimeout(resolve, 1000)).then(() => promise);
}
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
  const [isAuth,setAuth] = useState();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false)

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
    fetchUsers().catch((error) => console.error("Ошибка обновления списка пользователей", error))
  }, [fetchUsers]);


  const userCount = useMemo (() => users.length, [users])

  const Layout = () => {
    return (
      <>
        <Header />
        <main>
          <Outlet />
          <button onClick={openForm}>Open Form</button>
            <FeedbackFormPortal
            isOpen={isFormOpen}
            onClose={closeForm}
            />
        </main>
        <Footer />
      </>
    );
  };
  

  return (
    <>
    <AuthContext.Provider value={{isAuth, setAuth}}>
    <SupabaseContext.Provider value={supabase}>
      <StyleProvider>
        <CartProvider>
        <Suspense fallback={<div>now loading...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="catalog" element={<Catalog />}/>
              <Route path="cart" element={<Cart />}/>
              <Route path="login" element={<LoginForm sender={supabase} setCurrentUser={setCurrentUser} action={GetUser} />}/>
              <Route path="home" element={<Home />}/>
              <Route path="category/:id" element={<CategoryProduct />}/>
              <Route path="products/:id" element={<Product />}/>
              <Route path="*" element={
                <h1>Page not found</h1>} />
            </Route>
            
          </Routes>
          </Suspense>
        </CartProvider>
      </StyleProvider>
    </SupabaseContext.Provider>
        {/* <h1>React Hooks</h1>
        <RegisterForm sender={supabase} setUsers={setUsers} action={addUser}/>
        <h2>Try to login</h2>
        <LoginForm sender={supabase} setCurrentUser={setCurrentUser} action={GetUser}/>
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
        </div> */}


            </AuthContext.Provider>
    </>
  )
}

export default App
