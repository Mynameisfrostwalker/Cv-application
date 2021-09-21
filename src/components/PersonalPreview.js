import React from "react";
import PropTypes from "prop-types";
import "@fortawesome/fontawesome-free/js/all";
import grid from "../styles/ppreview.module.css";

/**
 * @module PersonalPreview
 */

/**
 * Personal Preview component
 * @param {Object} param0 - props
 * @param {Object} param0.values -Values to display
 * @param {Function} param0.editMode -Edit function
 * @return {JSX}
 */
const PersonalPreview = ({ values, editMode }) => {
  const display = (info, key) => {
    if (key === "photo") {
      return (
        <div key={info[1]} className="photoclass">
          <img src={info[0]} alt="" width="80rem" height="80rem" />
        </div>
      );
    }

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
    <div className={grid.grid}>
      {keys.map((key) => display(values[key], key))}
      <button
        type="button"
        onClick={editMode}
        className="personalpreviewbutton"
      >
        Edit
        <i className="fas fa-pencil-alt" />
      </button>
    </div>
  );
};

/**
 * @type {Object}
 */
PersonalPreview.propTypes = {
  values: PropTypes.shape({
    photo: PropTypes.string,
    title: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    mail: PropTypes.string,
    number: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
  editMode: PropTypes.func.isRequired,
};

export default PersonalPreview;
