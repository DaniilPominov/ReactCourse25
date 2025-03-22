import bcrypt from "bcryptjs";

import { v4 as uuidv4 } from 'uuid';
import React, {useState, useEffect, useRef, useMemo, useCallback, useReducer, Suspense } from 'react'
import { SupabaseContext } from './components/OnlineStore/SupabaseContext'; 
import { createClient } from '@supabase/supabase-js'
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { Route, Routes, Outlet } from 'react-router-dom';
import Cart from './components/OnlineStore/pages/Cart';
const Catalog = React.lazy(() => import('./components/OnlineStore/pages/Catalog'));
import Header from './components/OnlineStore/Header';
import Footer from './components/OnlineStore/Footer';
const CategoryProduct = React.lazy(() => import('./components/OnlineStore/pages/CategoryProduct'));
import Home from './components/OnlineStore/pages/Home';
import Product from './components/OnlineStore/pages/Product';
import CartProvider from './components/OnlineStore/CartProvider';
import FeedbackFormPortal from './components/FeedbackFormPortal';
import { StyleProvider } from './components/OnlineStore/StyleProvider';
import './App.scss';
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
      <div className="App">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  };

  return (
    <>
    <SupabaseContext.Provider value={supabase}>
      <StyleProvider>
        <CartProvider>
          
            <Routes>
                  <Route path="/" element={<Layout />}>
                      <Route path="catalog" element={
                        <Suspense fallback={<div class="loading-fallback">Please wait...</div>}>
                          <Catalog />
                        </Suspense>
                      }/>
                      <Route path="cart" element={<Cart />}/>
                      <Route path="home" element={<Home />}/>
                      <Route path="category/:id" element={<CategoryProduct />}/>
                      <Route path="products/:id" element={<Product />}/>
                      <Route path="*" element={
                        <h1>Page not found</h1>} />
                  </Route>
            </Routes>
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

        <button className="feedback-form-button" onClick={openForm}>Leave feedback</button>
            <FeedbackFormPortal
            isOpen={isFormOpen}
            onClose={closeForm}
            />
    </>
  )
}

export default App
