import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './pages/Login'
import Layout from './components/Layout'
// import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import RequireAuth from './components/RequireAuth'
import NoteList from './components/NoteList'
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import { useAppSelector } from './app/hook';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute'

function App() {

  const auth = useAppSelector(state => state.auth);

  useEffect(() => {
    console.log(auth); 
  },[auth])

  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />

          <Route element={<PrivateRoute />}>
             <Route path="/" element={<Home />} />
             <Route path="/notes" element={<NoteList />}/>
          </Route>
         </Route>
        </Routes>
    </BrowserRouter>
      
  )
}

export default App
