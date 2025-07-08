import React from 'react'
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer-copy">
        &copy; {year} FilmRank · Creado por <a href="https://github.com/GaitanTomas" target="_blank" className="footer-name">Tomás Gaitán</a> · Todos los derechos reservados.
      </p>
    </footer>
  )
}

export default Footer