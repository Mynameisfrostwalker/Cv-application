import React from "react";
import "@fortawesome/fontawesome-free/js/all";
import headerStyles from "../styles/Header.module.css";

/**
 * @module Header
 */

/**
 * Header component
 * @return {JSX}
 */
const Header = () => (
  <header className={headerStyles.header}>
    <div>
      <h1 className={headerStyles.firstHeader}>CV-App</h1>
      <h2 className={headerStyles.secondHeader}>Create your Resume</h2>
    </div>
    <div className={headerStyles.scroll}>
      <i className="fas fa-scroll" />
    </div>
  </header>
);

export default Header;
