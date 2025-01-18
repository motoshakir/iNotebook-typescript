import React from 'react'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  
  return (
   <div>
      {/* Common Header and Navbar */}
      <Header />
      <Navbar />

      {/* Render child routes here */}
      <main>
        <Outlet />
      </main>

      {/* Common Footer */}
      <Footer />
    </div>
  )
}

export default Layout