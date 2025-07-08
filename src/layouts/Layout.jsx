import React from "react";
import { Outlet } from 'react-router-dom';
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";

const Layout = () => {
  return (
    <>
      <header className="header">
        <Navbar />
      </header>
      <main style={{ paddingTop: "80px" }}>
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
};

export default Layout;