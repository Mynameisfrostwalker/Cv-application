import React from "react";
import PropTypes from "prop-types";
import "@fortawesome/fontawesome-free/js/all";
import experience from "../styles/education.module.css";

/**
 * @module ExpPreview
 */

/**
 * Personal Preview component
 * @param {Object} param0 - props
 * @param {Object} param0.values -Values to display
 * @param {Function} param0.editMode -Edit function
 * @param {NUmber} param0.datakey - Identifies this component
 * @param {Object} param0.deleteMode -Delete function
 * @param {Object} param0.addMode -Add function
 * @return {JSX}
 */
const ExpPreview = ({ values, editMode, datakey, deleteMode, addMode }) => {
  const display = (info, key) => {
    const capitalize = (w) => {
      const newWord = w.split("");
      newWord[0] = newWord[0].toUpperCase();
      return newWord.join("");
    };

    return (
      <div key={info[1]}>
        <h3>{`${capitalize(key)}`}:</h3>
        <p>{info[0]}</p>
      </div>
    );
  };

  const keys = Object.keys(values);

  return (
    <div className={experience.grid}>
      {keys.map((key) => display(values[key], key))}
      <button
        type="button"
        onClick={editMode}
        className="EduPreviewbutton"
        data-key={datakey}
      >
        Edit
        <i className="fas fa-pencil-alt" />
      </button>
      {datakey !== 0 ? (
        <button
          type="button"
          className={experience.deletebutton}
          data-key={datakey}
          onClick={deleteMode}
        >
          Delete
          <i className="fas fa-trash" />
        </button>
      ) : (
        <button
          type="button"
          className={experience.addbutton}
          onClick={addMode}
        >
          Add
          <i className="fas fa-plus-circle" />
        </button>
      )}
    </div>
  );
};

/**
 * @type {Object}
 */
ExpPreview.propTypes = {
  values: PropTypes.shape({
    "Company Name": PropTypes.string,
    Position: PropTypes.string,
    "Start Date": PropTypes.string,
    "End Date": PropTypes.string,
  }).isRequired,
  editMode: PropTypes.func.isRequired,
  datakey: PropTypes.number.isRequired,
  deleteMode: PropTypes.func.isRequired,
  addMode: PropTypes.func.isRequired,
};

export default ExpPreview;
