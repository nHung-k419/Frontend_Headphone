import React from "react";
import Home from "../../pages/Client/Home";
import Header from "../Header";
import Navbar from "../Navbar";
import Footer from "../footer";
function DefaultLayout({ children }) {
  // console.log(children.props);
  return (
    <div>
      <Navbar />
      {/* <Header/> */}
      <div className="content">{children}</div>
      <Footer/>
    </div>
  );
}

export default DefaultLayout;
