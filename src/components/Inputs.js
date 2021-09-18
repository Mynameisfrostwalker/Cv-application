import React from "react";
import PropTypes from "prop-types";
import input from "../styles/inputs.module.css";
import Icon from "../assets/icon.jpg";

const Inputs = ({ hfor, kind, name, type, req, acc }) => {
  const display = () => {
    if (type === "select") {
      return (
        <div className={input.select}>
          <select
            id={hfor}
            defaultValue="Default"
            className={input.selectstyle}
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
        />
      );
    }
    return (
      <input
        type={kind}
        id={hfor}
        required={req}
        accept={acc !== "" ? acc : null}
        className={`${input.inputstyle} ${
          hfor === "photo" ? input.photo : null
        }`}
      />
    );
  };

  const img = () => {
    if (hfor === "photo") {
      return <img src={Icon} alt="" width="80rem" height="80rem" />;
    }
    return null;
  };

  return (
    <div className={`${hfor}class `}>
      <div
        className={`${input.maindiv} ${hfor === "photo" ? null : input.box}`}
      >
        <label htmlFor={hfor}>
          <p className={input.pstyle}>{name}</p>
          {img()}
          {display()}
        </label>
        <span className="error" id={`${hfor}error`} />
      </div>
    </div>
  );
};

Inputs.defaultProps = {
  name: "",
  type: "input",
  kind: "text",
  req: false,
  acc: "",
};

Inputs.propTypes = {
  hfor: PropTypes.string.isRequired,
  kind: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  req: PropTypes.bool,
  acc: PropTypes.string,
};

export default Inputs;
