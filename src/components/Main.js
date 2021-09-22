import React, { useState } from "react";
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
const Main = () => {
  const [imgsrc, setImgSrc] = useState([Icon, uniqid()]);
  const [values, setValues] = useState({
    photo: ["", uniqid()],
    title: ["Default", uniqid()],
    firstName: ["", uniqid()],
    lastName: ["", uniqid()],
    number: ["", uniqid()],
    mail: ["", uniqid()],
    address: ["", uniqid()],
  });
  const [personalPreview, setPersonalPreview] = useState(false);
  const [eduValues, setEduValues] = useState([
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
  ]);
  const [expValues, setExpValues] = useState([
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
  ]);

  /**
   * Updates image scr
   * @param {Object} e
   */
  const handleImg = (e) => {
    setImgSrc([URL.createObjectURL(e.target.files[0]), imgsrc[1]]);
  };

  /**
   * Updates state on Personal component change
   * @param {Object} e
   */
  const handleChange = (e) => {
    const newObj = { ...values };
    const keys = Object.keys(newObj);
    for (let i = 0; i < keys.length; i += 1) {
      if (e.target.id === keys[i]) {
        newObj[keys[i]] = [e.target.value, newObj[keys[i]][1]];
      }
    }
    setValues(newObj);
  };

  /**
   * Updates state on Personal component submit
   * @param {Object} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setPersonalPreview(true);
    setValues({
      photo: imgsrc,
      title: values.title,
      firstName: values.firstName,
      lastName: values.lastName,
      number: values.number,
      mail: values.mail,
      address: values.address,
    });
  };

  /**
   * Changes Personal component to preview mode
   * @function
   */
  const edit = () => {
    setPersonalPreview(false);
    setValues({
      photo: ["", uniqid()],
      title: values.title,
      firstName: values.firstName,
      lastName: values.lastName,
      number: values.number,
      mail: values.mail,
      address: values.address,
    });
  };

  /**
   * Updates state on Education component change
   * @param {Object} e
   */
  const eduChange = (e) => {
    const newarr = [...eduValues];
    const id = parseInt(e.target.getAttribute("data-key"), 10);
    const obj = newarr[id].values;
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i += 1) {
      if (e.target.id === keys[i]) {
        obj[keys[i]][0] = e.target.value;
      }
    }
    setEduValues(newarr);
  };

  /**
   * Adds another Education component
   * @function
   */
  const addEdu = () => {
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
    setEduValues(newarr);
  };

  /**
   * Updates state on Education component submit
   * @param {Object} e
   */
  const eduSubmit = (e) => {
    e.preventDefault();
    const newarr = [...eduValues];
    const id = parseInt(e.target.getAttribute("data-key"), 10);
    newarr[id].type = "preview";
    setEduValues(newarr);
  };

  /**
   * Deletes education component
   * @param {Object} e
   */
  const eduDelete = (e) => {
    const newarr = [...eduValues];
    const id = parseInt(e.target.getAttribute("data-key"), 10);
    newarr.splice(id, 1);
    setEduValues(newarr);
  };

  /**
   * Edits education component
   * @param {Objects} e
   */
  const eduEdit = (e) => {
    const newarr = [...eduValues];
    const id = parseInt(e.target.getAttribute("data-key"), 10);
    newarr[id].type = "education";
    setEduValues(newarr);
  };

  /**
   * Diplays Education or Education preview component.
   * @param {Object} obj - Education value state
   * @param {Number} index
   * @return {JSX}
   */
  const eduDisplay = (obj, index) => {
    if (obj.type === "education") {
      return (
        <Education
          key={obj.key}
          change={eduChange}
          datakey={index}
          values={eduValues[index].values}
          newEducation={addEdu}
          submit={eduSubmit}
          eduDelete={eduDelete}
        />
      );
    }
    return (
      <EduPreview
        key={obj.key}
        values={eduValues[index].values}
        editMode={eduEdit}
        datakey={index}
        deleteMode={eduDelete}
        addMode={addEdu}
      />
    );
  };

  /**
   * Updates state on Experience component change
   * @param {Object} e
   */
  const expChange = (e) => {
    const newarr = [...expValues];
    const id = parseInt(e.target.getAttribute("data-key"), 10);
    const obj = newarr[id].values;
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i += 1) {
      if (e.target.id === keys[i]) {
        obj[keys[i]][0] = e.target.value;
      }
    }
    setExpValues(newarr);
  };

  /**
   * Adds another Experience component
   * @function
   */
  const addExp = () => {
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
    setExpValues(newarr);
  };

  /**
   * Updates state on Experience component submit
   * @param {Object} e
   */
  const expSubmit = (e) => {
    e.preventDefault();
    const newarr = [...expValues];
    const id = parseInt(e.target.getAttribute("data-key"), 10);
    newarr[id].type = "preview";
    setExpValues(newarr);
  };

  /**
   * Deletes experience component
   * @param {Object} e
   */
  const expDelete = (e) => {
    const newarr = [...expValues];
    const id = parseInt(e.target.getAttribute("data-key"), 10);
    newarr.splice(id, 1);
    setExpValues(newarr);
  };

  /**
   * Edits experience component
   * @param {Objects} e
   */
  const expEdit = (e) => {
    const newarr = [...expValues];
    const id = parseInt(e.target.getAttribute("data-key"), 10);
    newarr[id].type = "experience";
    setExpValues(newarr);
  };

  /**
   * Diplays Experience or Experience preview component.
   * @param {Object} obj - Education value state
   * @param {Number} index
   * @return {JSX}
   */
  const expDisplay = (obj, index) => {
    if (obj.type === "experience") {
      return (
        <Experience
          key={obj.key}
          change={expChange}
          datakey={index}
          values={expValues[index].values}
          newExperience={addExp}
          submit={expSubmit}
          expDelete={expDelete}
        />
      );
    }
    return (
      <ExpPreview
        key={obj.key}
        values={expValues[index].values}
        editMode={expEdit}
        datakey={index}
        deleteMode={expDelete}
        addMode={addExp}
      />
    );
  };

  return (
    <main className={main.mainstyle}>
      <div>
        {!personalPreview ? (
          <Personal
            change={handleChange}
            values={values}
            handleImg={handleImg}
            imgsrc={imgsrc}
            submit={handleSubmit}
          />
        ) : (
          <PersonalPreview values={values} editMode={edit} />
        )}
        {eduValues.map((obj, index) => eduDisplay(obj, index))}
        {expValues.map((obj, index) => expDisplay(obj, index))}
      </div>
    </main>
  );
};

export default Main;
