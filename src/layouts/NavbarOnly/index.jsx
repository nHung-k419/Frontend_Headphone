import React from 'react'
import Home from '../../pages/Home'
import Navbar from '../Navbar'
function NavbarOnly({ children }) {
  console.log(children);
  return (
    <div>
      <Navbar />
      <div className='content'>
        {children}
      </div>
    </div>
  )
}

export default NavbarOnly