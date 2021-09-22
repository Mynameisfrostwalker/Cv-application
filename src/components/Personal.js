import React from "react";
import PropTypes from "prop-types";
import Inputs from "./Inputs";
import personal from "../styles/personal.module.css";
import "@fortawesome/fontawesome-free/js/all";
import useValidate from "./Hooks/useValidate";

/**
 * @module Personal
 */

const Personal = ({ values, submit, imgsrc, handleImg, change }) => {
  const [valid, errmessage, handleInvalidate] = useValidate(
    {
      photo: "null",
      title: "null",
      firstName: "null",
      lastName: "null",
      number: "null",
      mail: "null",
      address: "null",
    },
    {
      photo: "null",
      title: "null",
      firstName: "null",
      lastName: "null",
      number: "null",
      mail: "null",
      address: "null",
    },
    change
  );

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
