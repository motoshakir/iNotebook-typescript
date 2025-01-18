import React from 'react'
import { useAppSelector } from '../app/hook'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../app/hook'
import { logout } from '../features/auth/authSlice'
function Navbar() {

  const dispatch = useAppDispatch();

    const handleLogout = () => {
    dispatch(logout()); 
  };
  
  return (
     <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <button onClick={handleLogout}>logout</button>
    </nav>
  )
}

export default Navbar