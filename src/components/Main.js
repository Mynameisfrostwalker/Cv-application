import React from "react";
import Personal from "./Personal";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import main from "../styles/main.module.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <main className={main.mainstyle}>
        <div>
          <Personal />
          <Education />
          <Experience />
          <Skills />
        </div>
      </main>
    );
  }
}

export default Main;
