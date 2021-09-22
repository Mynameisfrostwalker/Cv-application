import React from "react";
import PropTypes from "prop-types";
import Inputs from "./Inputs";
import education from "../styles/education.module.css";
import "@fortawesome/fontawesome-free/js/all";
import useValidate from "./Hooks/useValidate";

/**
 * @module Education
 */

/**
 * Personal component
 */
const Education = ({
  change,
  datakey,
  values,
  newEducation,
  submit,
  eduDelete,
}) => {
  const [valid, errmessage, handleInvalidate] = useValidate(
    {
      "School Name": "null",
      Degree: "null",
      "Start Date": "null",
      "End Date": "null",
    },
    {
      "School Name": "null",
      Degree: "null",
      "Start Date": "null",
      "End Date": "null",
    },
    change
  );

  return (
    <form className={education.grid} data-key={datakey} onSubmit={submit}>
      <Inputs
        hfor="School Name"
        kind="text"
        name="School Name"
        invalid={handleInvalidate}
        displayinvalid={valid["School Name"]}
        errormessage={errmessage["School Name"]}
        datakey={datakey}
        value={values["School Name"][0]}
        req
      />
      <Inputs
        hfor="Degree"
        kind="text"
        name="Qualification awarded"
        invalid={handleInvalidate}
        displayinvalid={valid.Degree}
        errormessage={errmessage.Degree}
        datakey={datakey}
        value={values.Degree[0]}
        req
      />
      <Inputs
        hfor="Start Date"
        kind="date"
        name="From"
        invalid={handleInvalidate}
        displayinvalid={valid["Start Date"]}
        errormessage={errmessage["Start Date"]}
        datakey={datakey}
        value={values["Start Date"][0]}
        req
      />
      <Inputs
        hfor="End Date"
        kind="date"
        name="To"
        invalid={handleInvalidate}
        displayinvalid={valid["End Date"]}
        errormessage={errmessage["End Date"]}
        datakey={datakey}
        min={values["Start Date"][0]}
        value={values["End Date"][0]}
      />
      <button type="submit" className={education.donebutton} datakey={datakey}>
        Done
        <i className="fas fa-paper-plane" />
      </button>
      {datakey !== 0 ? (
        <button
          type="button"
          className={education.deletebutton}
          data-key={datakey}
          onClick={eduDelete}
        >
          Delete
          <i className="fas fa-trash" />
        </button>
      ) : (
        <button
          type="button"
          className={education.addbutton}
          onClick={newEducation}
        >
          Add
          <i className="fas fa-plus-circle" />
        </button>
      )}
    </form>
  );
};

/**
 * @type {Object}
 */
Education.propTypes = {
  datakey: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  values: PropTypes.shape({
    "School Name": PropTypes.string,
    Degree: PropTypes.string,
    "Start Date": PropTypes.string,
    "End Date": PropTypes.string,
  }).isRequired,
  newEducation: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  eduDelete: PropTypes.func.isRequired,
};

export default Education;
