import React from "react";
import { Outlet } from 'react-router-dom';
import Navbar from "../components/Navbar/Navbar.jsx";

const Layout = () => {
  return (
    <>
      <header className="header">
        <Navbar />
      </header>
      <main style={{ paddingTop: "80px" }}>
        <Outlet /> 
      </main>
    </>
  );
};

export default Layout;