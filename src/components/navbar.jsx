import React from 'react';
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">SLiNGO</div>
      <ul className="nav-links">
        <li><a href="#">Flashcards</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
