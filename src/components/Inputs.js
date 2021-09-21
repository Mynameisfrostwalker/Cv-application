import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import input from "../styles/inputs.module.css";

/**
 * @module Inputs
 */

/**
 * Inputs component
 * @param {Object} param0 - Props
 * @param {String} param0.hfor - Input name and id
 * @param {String} param0.kind - Input type attribute(text, date, tel)
 * @param {String} param0.name - Display name
 * @param {String} param0.type - Input type(input, select, textarea)
 * @param {Boolean} param0.req - Required
 * @param {String} param0.acc - Image input accept attribute
 * @param {Function} param0.imgChange - Function called on image change
 * @param {String} param0.imgsrc -Image src attribute
 * @param {Function} param0.invalid - Form validation function
 * @param {String | Boolean} param0.displayinvalid - error message display control
 * @param {String} param0.pattern - Input pattern attribute
 * @param {String | Boolean} param0.errormessage - Error message
 * @param {String} param0.value - Input value attribute
 * @param {Number} param0.minLength - Input minlength attribute
 * @param {String} param0.max - Input max attribute
 * @param {String} param0.min - Input min attribute
 * @param {Number} param0.datakey - Input data-key attribute
 * @return {JSX}
 */
const Inputs = ({
  hfor,
  kind,
  name,
  type,
  req,
  acc,
  imgChange,
  imgsrc,
  invalid,
  displayinvalid,
  pattern,
  errormessage,
  value,
  minlength,
  max,
  min,
  datakey,
}) => {
  const display = () => {
    if (type === "select") {
      return (
        <div className={input.select}>
          <select
            id={hfor}
            className={input.selectstyle}
            onChange={invalid}
            name={hfor}
            value={value}
          >
            <option disabled value="Default">
              Title
            </option>
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Miss">Miss</option>
          </select>
        </div>
      );
    }
    if (type === "textarea") {
      return (
        <textarea
          id={hfor}
          name={hfor}
          required={req}
          className={input.textstyle}
          onChange={invalid}
          value={value}
          minLength={minlength}
          spellCheck="false"
        />
      );
    }
    return (
      <input
        type={kind}
        id={hfor}
        name={hfor}
        required={req}
        accept={acc !== "" ? acc : null}
        className={`${input.inputstyle} ${
          hfor === "photo" ? input.photo : null
        }`}
        onChange={
          hfor === "photo"
            ? (e) => {
                imgChange(e);
                invalid(e);
              }
            : invalid
        }
        pattern={pattern}
        value={value}
        max={kind === "date" ? max : null}
        min={hfor === "End Date" ? min : null}
        data-key={datakey}
      />
    );
  };

  const img = () => {
    if (hfor === "photo") {
      return (
        <img src={imgsrc} alt="" width="80rem" height="80rem" id="output" />
      );
    }
    return null;
  };

  const errordisplay = () => {
    if (hfor === "photo" || displayinvalid === "null") {
      return null;
    }
    if (!displayinvalid) {
      return "diverror";
    }
    return "divgood";
  };

  const err = () => {
    if (hfor === "photo") {
      return null;
    }
    if (errormessage !== "null") {
      return (
        <span
          className={`error ${displayinvalid === false ? "bad" : "good"}`}
          id={`${hfor}error`}
        >
          {errormessage}
        </span>
      );
    }
    return null;
  };

  const icon = () => {
    if (hfor === "photo" || displayinvalid === "null") {
      return null;
    }
    return !displayinvalid ? (
      <FontAwesomeIcon icon={faTimesCircle} />
    ) : (
      <FontAwesomeIcon icon={faCheckCircle} />
    );
  };

  return (
    <div className={`${hfor}class`}>
      <div className={`${errordisplay()}`}>
        <div
          className={`${input.maindiv} ${hfor === "photo" ? null : input.box}`}
        >
          <label htmlFor={hfor} className={input.label}>
            <p className={input.pstyle}>{name}</p>
            {img()}
            {display()}
          </label>
          <div className={`error ${!displayinvalid ? "bad" : "good"}`}>
            {icon()}
          </div>
        </div>
      </div>
      <div>{err()}</div>
    </div>
  );
};

/**
 * @type {Object}
 */
Inputs.defaultProps = {
  name: "",
  type: "input",
  kind: "text",
  req: false,
  acc: "",
  imgsrc: null,
  imgChange: null,
  pattern: null,
  errormessage: null,
  minlength: 0,
  max: `${format(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ),
    "yyyy-MM-dd"
  )}`,
  min: "",
};

/**
 * @type {Object}
 */
Inputs.propTypes = {
  hfor: PropTypes.string.isRequired,
  kind: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  req: PropTypes.bool,
  acc: PropTypes.string,
  imgChange: PropTypes.func,
  imgsrc: PropTypes.string,
  invalid: PropTypes.func.isRequired,
  displayinvalid: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
    .isRequired,
  pattern: PropTypes.string,
  errormessage: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  value: PropTypes.string.isRequired,
  minlength: PropTypes.number,
  max: PropTypes.string,
  min: PropTypes.string,
  datakey: PropTypes.number.isRequired,
};

export default Inputs;
