import React from "react";
import uniqid from "uniqid";
import Personal from "./Personal";
import Education from "./Education";
import Experience from "./Experience";
import main from "../styles/main.module.css";
import PersonalPreview from "./PersonalPreview";
import Icon from "../assets/icon.jpg";
import EduPreview from "./EduPreview";
import ExpPreview from "./ExpPreview";

/**
 * @module Main
 */

/**
 * Main component
 */
class Main extends React.Component {
  /**
   * @param {Object} props
   */
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
      eduValues: [
        {
          type: "education",
          values: {
            "School Name": ["", uniqid()],
            Degree: ["", uniqid()],
            "Start Date": ["", uniqid()],
            "End Date": ["", uniqid()],
          },
          key: uniqid(),
        },
      ],
      expValues: [
        {
          type: "experience",
          values: {
            "Company Name": ["", uniqid()],
            Position: ["", uniqid()],
            "Start Date": ["", uniqid()],
            "End Date": ["", uniqid()],
          },
          key: uniqid(),
        },
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImg = this.handleImg.bind(this);
    this.edit = this.edit.bind(this);
    this.eduDisplay = this.eduDisplay.bind(this);
    this.eduChange = this.eduChange.bind(this);
    this.addEdu = this.addEdu.bind(this);
    this.eduSubmit = this.eduSubmit.bind(this);
    this.eduDelete = this.eduDelete.bind(this);
    this.eduEdit = this.eduEdit.bind(this);
    this.expDisplay = this.expDisplay.bind(this);
    this.expChange = this.expChange.bind(this);
    this.addExp = this.addExp.bind(this);
    this.expSubmit = this.expSubmit.bind(this);
    this.expDelete = this.expDelete.bind(this);
    this.expEdit = this.expEdit.bind(this);
  }

  /**
   * Updates image scr
   * @param {Object} e
   */
  handleImg(e) {
    const { imgsrc } = this.state;
    this.setState({
      imgsrc: [URL.createObjectURL(e.target.files[0]), imgsrc[1]],
    });
  }

  /**
   * Updates state on Personal component change
   * @param {Object} e
   */
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

  /**
   * Updates state on Personal component submit
   * @param {Object} e
   */
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

  /**
   * Changes Personal component to preview mode
   * @function
   */
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

  /**
   * Diplays Education or Education preview component.
   * @param {Object} obj - Education value state
   * @param {Number} index
   * @return {JSX}
   */
  eduDisplay(obj, index) {
    const { eduValues } = this.state;
    if (obj.type === "education") {
      return (
        <Education
          key={obj.key}
          change={this.eduChange}
          datakey={index}
          values={eduValues[index].values}
          newEducation={this.addEdu}
          submit={this.eduSubmit}
          eduDelete={this.eduDelete}
        />
      );
    }
    return (
      <EduPreview
        key={obj.key}
        values={eduValues[index].values}
        editMode={this.eduEdit}
        datakey={index}
        deleteMode={this.eduDelete}
        addMode={this.addEdu}
      />
    );
  }

  /**
   * Updates state on Education component change
   * @param {Object} e
   */
  eduChange(e) {
    const { eduValues } = this.state;
    const newarr = [...eduValues];
    const id = parseInt(e.target.getAttribute("data-key"), 10);
    const obj = newarr[id].values;
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i += 1) {
      if (e.target.id === keys[i]) {
        obj[keys[i]][0] = e.target.value;
      }
    }
    this.setState({
      eduValues: newarr,
    });
  }

  /**
   * Adds another Education component
   * @function
   */
  addEdu() {
    const { eduValues } = this.state;
    const newarr = [...eduValues];
    newarr.push({
      type: "education",
      values: {
        "School Name": ["", uniqid()],
        Degree: ["", uniqid()],
        "Start Date": ["", uniqid()],
        "End Date": ["", uniqid()],
      },
      key: uniqid(),
    });
    this.setState({
      eduValues: newarr,
    });
  }

  /**
   * Updates state on Education component submit
   * @param {Object} e
   */
  eduSubmit(e) {
    e.preventDefault();
    const { eduValues } = this.state;
    const newarr = [...eduValues];
    const id = parseInt(e.target.getAttribute("data-key"), 10);
    newarr[id].type = "preview";
    this.setState({
      eduValues: newarr,
    });
  }

  /**
   * Deletes education component
   * @param {Object} e
   */
  eduDelete(e) {
    const { eduValues } = this.state;
    const newarr = [...eduValues];
    const id = parseInt(e.target.getAttribute("data-key"), 10);
    newarr.splice(id, 1);
    this.setState({
      eduValues: newarr,
    });
  }

  /**
   * Edits education component
   * @param {Objects} e
   */
  eduEdit(e) {
    const { eduValues } = this.state;
    const newarr = [...eduValues];
    const id = parseInt(e.target.getAttribute("data-key"), 10);
    newarr[id].type = "education";
    this.setState({
      eduValues: newarr,
    });
  }

  /**
   * Diplays Experience or Experience preview component.
   * @param {Object} obj - Education value state
   * @param {Number} index
   * @return {JSX}
   */
  expDisplay(obj, index) {
    const { expValues } = this.state;
    if (obj.type === "experience") {
      return (
        <Experience
          key={obj.key}
          change={this.expChange}
          datakey={index}
          values={expValues[index].values}
          newExperience={this.addExp}
          submit={this.expSubmit}
          expDelete={this.expDelete}
        />
      );
    }
    return (
      <ExpPreview
        key={obj.key}
        values={expValues[index].values}
        editMode={this.expEdit}
        datakey={index}
        deleteMode={this.expDelete}
        addMode={this.addExp}
      />
    );
  }

  /**
   * Updates state on Experience component change
   * @param {Object} e
   */
  expChange(e) {
    const { expValues } = this.state;
    const newarr = [...expValues];
    const id = parseInt(e.target.getAttribute("data-key"), 10);
    const obj = newarr[id].values;
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i += 1) {
      if (e.target.id === keys[i]) {
        obj[keys[i]][0] = e.target.value;
      }
    }
    this.setState({
      expValues: newarr,
    });
  }

  /**
   * Adds another Experience component
   * @function
   */
  addExp() {
    const { expValues } = this.state;
    const newarr = [...expValues];
    newarr.push({
      type: "experience",
      values: {
        "Company Name": ["", uniqid()],
        Position: ["", uniqid()],
        "Start Date": ["", uniqid()],
        "End Date": ["", uniqid()],
      },
      key: uniqid(),
    });
    this.setState({
      expValues: newarr,
    });
  }

  /**
   * Updates state on Experience component submit
   * @param {Object} e
   */
  expSubmit(e) {
    e.preventDefault();
    const { expValues } = this.state;
    const newarr = [...expValues];
    const id = parseInt(e.target.getAttribute("data-key"), 10);
    newarr[id].type = "preview";
    this.setState({
      expValues: newarr,
    });
  }

  /**
   * Deletes experience component
   * @param {Object} e
   */
  expDelete(e) {
    const { expValues } = this.state;
    const newarr = [...expValues];
    const id = parseInt(e.target.getAttribute("data-key"), 10);
    newarr.splice(id, 1);
    this.setState({
      expValues: newarr,
    });
  }

  /**
   * Edits experience component
   * @param {Objects} e
   */
  expEdit(e) {
    const { expValues } = this.state;
    const newarr = [...expValues];
    const id = parseInt(e.target.getAttribute("data-key"), 10);
    newarr[id].type = "experience";
    this.setState({
      expValues: newarr,
    });
  }

  render() {
    const { values, personalPreview, imgsrc, eduValues, expValues } =
      this.state;
    return (
      <main className={main.mainstyle}>
        <div>
          {!personalPreview ? (
            <Personal
              change={this.handleChange}
              values={values}
              handleImg={this.handleImg}
              imgsrc={imgsrc}
              submit={this.handleSubmit}
            />
          ) : (
            <PersonalPreview values={values} editMode={this.edit} />
          )}
          {eduValues.map((obj, index) => this.eduDisplay(obj, index))}
          {expValues.map((obj, index) => this.expDisplay(obj, index))}
        </div>
      </main>
    );
  }
}

export default Main;
