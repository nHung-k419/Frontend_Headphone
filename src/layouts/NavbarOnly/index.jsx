import React from 'react'
import Home from '../../pages/Client/Home';
import Navbar from '../Navbar'
import Footer from '../Footer';

function NavbarOnly({ children }) {
  // console.log(children);
  return (
    <div>
      <Navbar />
      <div className='content'>
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default NavbarOnly