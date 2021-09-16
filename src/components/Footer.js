import React from "react";
import footerStyle from "../styles/Footer.module.css";

/**
 * @module Footer
 */

/**
 * Footer
 * @return {JSX}
 */
const Footer = () => (
  <footer className={footerStyle.footer}>
    Created by Frostwalker
    <a
      href="https://github.com/Mynameisfrostwalker/Cv-appllication"
      target="_blank"
      rel="noreferrer"
    >
      <i className="fab fa-github" />
    </a>
  </footer>
);

export default Footer;
