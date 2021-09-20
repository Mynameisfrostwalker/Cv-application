import React from "react";
import uniqid from "uniqid";
import Personal from "./Personal";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import main from "../styles/main.module.css";
import PersonalPreview from "./PersonalPreview";
import Icon from "../assets/icon.jpg";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgsrc: [Icon, uniqid()],
      values: {
        photo: ["", uniqid()],
        title: ["Default", uniqid()],
        firstName: ["", uniqid()],
        lastName: ["", uniqid()],
        number: ["", uniqid()],
        mail: ["", uniqid()],
        address: ["", uniqid()],
      },
      personalPreview: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImg = this.handleImg.bind(this);
    this.edit = this.edit.bind(this);
  }

  handleImg(e) {
    const { imgsrc } = this.state;
    this.setState({
      imgsrc: [URL.createObjectURL(e.target.files[0]), imgsrc[1]],
    });
  }

  handleChange(e) {
    const { values } = this.state;
    const newObj = { ...values };
    const keys = Object.keys(newObj);
    for (let i = 0; i < keys.length; i += 1) {
      if (e.target.id === keys[i]) {
        newObj[keys[i]] = [e.target.value, newObj[keys[i]][1]];
      }
    }
    this.setState({
      values: newObj,
    });
  }

  handleSubmit(e) {
    const { values, imgsrc } = this.state;
    e.preventDefault();
    this.setState({
      personalPreview: true,
      values: {
        photo: imgsrc,
        title: values.title,
        firstName: values.firstName,
        lastName: values.lastName,
        number: values.number,
        mail: values.mail,
        address: values.address,
      },
    });
  }

  edit() {
    const { values } = this.state;
    this.setState({
      personalPreview: false,
      values: {
        photo: ["", uniqid()],
        title: values.title,
        firstName: values.firstName,
        lastName: values.lastName,
        number: values.number,
        mail: values.mail,
        address: values.address,
      },
    });
  }

  render() {
    const { values, personalPreview, imgsrc } = this.state;
    return (
      <main className={main.mainstyle}>
        <div>
          {!personalPreview ? (
            <Personal
              change={this.handleChange}
              values={values}
              submit={this.handleSubmit}
              handleImg={this.handleImg}
              imgsrc={imgsrc}
            />
          ) : (
            <PersonalPreview values={values} editMode={this.edit} />
          )}
          <Education />
          <Experience />
          <Skills />
        </div>
      </main>
    );
  }
}

export default Main;
