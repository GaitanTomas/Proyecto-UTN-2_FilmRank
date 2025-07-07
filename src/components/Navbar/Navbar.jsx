import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, House, TvMinimalPlay, Star, Clapperboard } from "lucide-react";
import ThemeToggle from "../ThemeToggle/ThemeToggle.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import "./Navbar.css";

const Navbar = () => {
  const getNavLinkClass = ({ isActive }) => `nav-link ${isActive ? 'active' : ''}`;
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="nav">
      {/* Menu desktop */}
      <div className="nav-container__title-links">
        <Link to="/" onClick={closeMenu}>
          <h1 className="nav-title">Film<span className="nav-span">Rank</span></h1>
        </Link>
        <ul className="nav-list">
          <li className="nav-list-item">
            <NavLink to="/" className={getNavLinkClass}>Inicio</NavLink>
          </li>
          <li className="nav-list-item">
            <NavLink to="/peliculas" className={getNavLinkClass}>Películas</NavLink>
          </li>
          <li className="nav-list-item">
            <NavLink to="/series" className={getNavLinkClass}>Series</NavLink>
          </li>
          <li className="nav-list-item">
            <NavLink to="/miranking" className={getNavLinkClass}>Mi Ranking</NavLink>
          </li>
        </ul>
      </div>
      <div className="nav-container__search-theme">
        <SearchBar />
        <ThemeToggle />
        <button className="menu-btn" onClick={toggleMenu} aria-label="Abrir menú">
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      </div>
      {/* Menu mobile */}
      {isMenuOpen && (
      <div className="mobile-menu">
        <p className="mobile-menu__title">Menú</p>
        <NavLink to="/" onClick={closeMenu} className={getNavLinkClass}><House /> Inicio</NavLink>
        <NavLink to="/peliculas" onClick={closeMenu} className={getNavLinkClass}><Clapperboard /> Películas</NavLink>
        <NavLink to="/series" onClick={closeMenu} className={getNavLinkClass}><TvMinimalPlay /> Series</NavLink>
        <NavLink to="/miranking" onClick={closeMenu} className={getNavLinkClass}><Star /> Mi Ranking</NavLink>
        <hr />
        <div className="mobile-menu__search-container">
          <p className="mobile-menu__title">Búsqueda</p>
          <SearchBar />
        </div>
      </div>
      )}
    </nav>
  );
};

export default Navbar;
