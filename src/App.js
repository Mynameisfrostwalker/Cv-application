import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import app from "./styles/app.module.css";

/**
 * @module App
 */

const App = () => (
  <div id="container">
    <Header />
    <div className={app.form}>
      <Main />
    </div>
    <Footer />
  </div>
);

export default App;
