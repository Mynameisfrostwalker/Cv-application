import React from "react";
import PropTypes from "prop-types";
import Inputs from "./Inputs";
import experience from "../styles/education.module.css";
import "@fortawesome/fontawesome-free/js/all";
import useValidate from "./Hooks/useValidate";

/**
 * @module Experience
 */

/**
 * Personal component
 */
const Experience = ({
  datakey,
  values,
  newExperience,
  submit,
  expDelete,
  change,
}) => {
  const [valid, errmessage, handleInvalidate] = useValidate(
    {
      "Company Name": "null",
      Position: "null",
      "Start Date": "null",
      "End Date": "null",
    },
    {
      "Company Name": "null",
      Position: "null",
      "Start Date": "null",
      "End Date": "null",
    },
    change
  );

  return (
    <form className={experience.grid} data-key={datakey} onSubmit={submit}>
      <Inputs
        hfor="Company Name"
        kind="text"
        name="Company Name"
        invalid={handleInvalidate}
        displayinvalid={valid["Company Name"]}
        errormessage={errmessage["Company Name"]}
        datakey={datakey}
        value={values["Company Name"][0]}
        req
      />
      <Inputs
        hfor="Position"
        kind="text"
        name="Position"
        invalid={handleInvalidate}
        displayinvalid={valid.Position}
        errormessage={errmessage.Position}
        datakey={datakey}
        value={values.Position[0]}
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
      <button type="submit" className={experience.donebutton} datakey={datakey}>
        Done
        <i className="fas fa-paper-plane" />
      </button>
      {datakey !== 0 ? (
        <button
          type="button"
          className={experience.deletebutton}
          data-key={datakey}
          onClick={expDelete}
        >
          Delete
          <i className="fas fa-trash" />
        </button>
      ) : (
        <button
          type="button"
          className={experience.addbutton}
          onClick={newExperience}
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
Experience.propTypes = {
  datakey: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  values: PropTypes.shape({
    "Company Name": PropTypes.string,
    Position: PropTypes.string,
    "Start Date": PropTypes.string,
    "End Date": PropTypes.string,
  }).isRequired,
  newExperience: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  expDelete: PropTypes.func.isRequired,
};

export default Experience;
