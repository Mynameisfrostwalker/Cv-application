import React from "react";
import Personal from "./Personal";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import main from "../styles/main.module.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        photo: "",
        title: "Default",
        firstName: "",
        lastName: "",
        num: "",
        mail: "",
        address: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { values } = this.state;
    const newObj = { ...values };
    const keys = Object.keys(newObj);
    for (let i = 0; i < keys.length; i += 1) {
      if (e.target.id === keys[i]) {
        newObj[keys[i]] = e.target.value;
      }
    }
    this.setState({
      values: newObj,
    });
  }

  render() {
    const { values } = this.state;
    return (
      <main className={main.mainstyle}>
        <div>
          <Personal change={this.handleChange} values={values} />
          <Education />
          <Experience />
          <Skills />
        </div>
      </main>
    );
  }
}

export default Main;
