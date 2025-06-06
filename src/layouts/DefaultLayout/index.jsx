import React from "react";
import Home from "../../pages/Home";
import Header from "../header";
import Navbar from "../Navbar";
import Footer from "../footer";
function DefaultLayout({ children }) {
  console.log(children.props);
  return (
    <div>
      <Navbar />
      <Header/>
      <div className="content">{children}</div>
      <Footer/>
    </div>
  );
}

export default DefaultLayout;
