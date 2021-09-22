import React, { useState } from "react";
import PropTypes from "prop-types";
import Inputs from "./Inputs";
import personal from "../styles/personal.module.css";
import "@fortawesome/fontawesome-free/js/all";

/**
 * @module Personal
 */

const Personal = ({ values, submit, imgsrc, handleImg, change }) => {
  const [valid, setValid] = useState({
    photo: "null",
    title: "null",
    firstName: "null",
    lastName: "null",
    number: "null",
    mail: "null",
    address: "null",
  });
  const [errmessage, setErrmessage] = useState({
    photo: "null",
    title: "null",
    firstName: "null",
    lastName: "null",
    number: "null",
    mail: "null",
    address: "null",
  });

  /**
   * shows errors
   * @param {Object} input
   * @param {Object} obj - Invalid state
   * @param {string} goal - Input id
   */
  const showError = (input, obj, goal) => {
    const inputError = { ...obj };
    if (input.validity.valueMissing) {
      inputError[goal] = "Input must not be left blank!";
    } else if (input.validity.typeMismatch) {
      inputError[goal] = `Entered value must be a valid ${input.type}.`;
    } else if (input.validity.tooShort) {
      inputError[
        goal
      ] = `Input should be at least ${input.minLength} characters; you entered ${input.value.length}.`;
    } else if (input.validity.tooLong) {
      inputError[
        goal
      ] = `Input should be at most ${input.maxLength} characters; you entered ${input.value.length}.`;
    } else if (input.validity.rangeUnderflow) {
      inputError[
        goal
      ] = `Input should be at least ${input.min}; you entered ${input.value}`;
    } else if (input.validity.rangeOverflow) {
      inputError[
        goal
      ] = `Input should be at most ${input.max}; you entered ${input.value}`;
    } else if (input.validity.patternMismatch) {
      inputError[goal] = `Input must be in the form 123-4567-8910`;
    }
    setErrmessage(inputError);
  };

  /**
   * Form Validation
   * @param {Object} event
   */
  const validator = (event) => {
    const goal = event.target.id;
    const newObj = { ...valid };
    if (event.target.validity.valid) {
      newObj[goal] = "Input is valid!";
      setErrmessage(newObj);
    } else showError(event.target, valid, goal);
  };

  /*
   * Form Validation
   * @param {Object} e
   */
  const handleInvalidate = (e) => {
    change(e);
    validator(e);
    const newObj = { ...valid };
    if (!e.target.validity.valid) {
      newObj[e.target.id] = false;
    } else newObj[e.target.id] = true;
    setValid(newObj);
  };

  return (
    <form className={personal.formstyle} onSubmit={submit}>
      <Inputs
        hfor="photo"
        kind="file"
        acc="image/*"
        imgChange={handleImg}
        imgsrc={imgsrc[0]}
        invalid={handleInvalidate}
        displayinvalid={valid.photo}
        errormessage={errmessage.photo}
        value={values.photo[0]}
      />
      <Inputs
        hfor="title"
        name=""
        type="select"
        invalid={handleInvalidate}
        displayinvalid={valid.title}
        errormessage={errmessage.title}
        value={values.title[0]}
      />
      <Inputs
        hfor="firstName"
        kind="text"
        name="First Name*"
        req
        invalid={handleInvalidate}
        displayinvalid={valid.firstName}
        errormessage={errmessage.firstName}
        value={values.firstName[0]}
      />
      <Inputs
        hfor="lastName"
        kind="text"
        name="Last Name*"
        req
        invalid={handleInvalidate}
        displayinvalid={valid.lastName}
        errormessage={errmessage.lastName}
        value={values.lastName[0]}
      />
      <Inputs
        hfor="mail"
        kind="email"
        name="Email*"
        req
        invalid={handleInvalidate}
        displayinvalid={valid.mail}
        errormessage={errmessage.mail}
        value={values.mail[0]}
      />
      <Inputs
        hfor="number"
        kind="tel"
        name="Phone Number*"
        req
        pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
        invalid={handleInvalidate}
        displayinvalid={valid.number}
        errormessage={errmessage.number}
        value={values.number[0]}
      />
      <Inputs
        hfor="address"
        type="textarea"
        name="Home Address*"
        req
        minlength={10}
        invalid={handleInvalidate}
        displayinvalid={valid.address}
        errormessage={errmessage.address}
        value={values.address[0]}
      />
      <button type="submit" className="donebutton">
        Done
        <i className="fas fa-paper-plane" />
      </button>
    </form>
  );
};

/**
 * @type {Object}
 */
Personal.propTypes = {
  change: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  values: PropTypes.shape({
    photo: PropTypes.string,
    title: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    mail: PropTypes.string,
    number: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
  imgsrc: PropTypes.string.isRequired,
  handleImg: PropTypes.func.isRequired,
};

export default Personal;
