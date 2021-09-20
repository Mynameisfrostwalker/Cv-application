import React from "react";
import PropTypes from "prop-types";
import Inputs from "./Inputs";
import education from "../styles/education.module.css";
import "@fortawesome/fontawesome-free/js/all";

class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: {
        "School Name": "null",
        Degree: "null",
        "Start Date": "null",
        "End Date": "null",
      },
      errmessage: {
        "School Name": "null",
        Degree: "null",
        "Start Date": "null",
        "End Date": "null",
      },
    };

    this.handleInvalidate = this.handleInvalidate.bind(this);
    this.validator = this.validator.bind(this);
    this.showError = this.showError.bind(this);
  }

  handleInvalidate(e) {
    const { change } = this.props;
    change(e);
    this.validator(e);
    const { valid } = this.state;
    const newObj = { ...valid };
    if (!e.target.validity.valid) {
      newObj[e.target.id] = false;
    } else newObj[e.target.id] = true;
    this.setState({ valid: newObj });
  }

  validator(event) {
    const goal = event.target.id;
    const { valid } = this.state;
    const newObj = { ...valid };
    if (event.target.validity.valid) {
      newObj[goal] = "Input is valid!";
      this.setState({
        errmessage: newObj,
      });
    } else this.showError(event.target, valid, goal);
  }

  showError(input, obj, goal) {
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
    this.setState({
      errmessage: inputError,
    });
  }

  render() {
    const { valid, errmessage } = this.state;
    const { datakey, values } = this.props;
    return (
      <form className={education.grid}>
        <Inputs
          hfor="School Name"
          kind="text"
          name="School Name"
          invalid={this.handleInvalidate}
          displayinvalid={valid["School Name"]}
          errormessage={errmessage["School Name"]}
          datakey={datakey}
          value={values["School Name"][0]}
        />
        <Inputs
          hfor="Degree"
          kind="text"
          name="Qualification awarded"
          invalid={this.handleInvalidate}
          displayinvalid={valid.Degree}
          errormessage={errmessage.Degree}
          datakey={datakey}
          value={values.Degree[0]}
        />
        <Inputs
          hfor="Start Date"
          kind="date"
          name="From"
          invalid={this.handleInvalidate}
          displayinvalid={valid["Start Date"]}
          errormessage={errmessage["Start Date"]}
          datakey={datakey}
          value={values["Start Date"][0]}
        />
        <Inputs
          hfor="End Date"
          kind="date"
          name="To"
          invalid={this.handleInvalidate}
          displayinvalid={valid["End Date"]}
          errormessage={errmessage["End Date"]}
          datakey={datakey}
          value={values["End Date"][0]}
        />
        <button type="submit" className={education.donebutton}>
          Done
          <i className="fas fa-paper-plane" />
        </button>
        <button type="button" className={education.addbutton}>
          Add
          <i className="fas fa-plus-circle" />
        </button>
      </form>
    );
  }
}

Education.propTypes = {
  datakey: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  values: PropTypes.shape({
    "School Name": PropTypes.string,
    Degree: PropTypes.string,
    "Start Date": PropTypes.string,
    "End Date": PropTypes.string,
  }).isRequired,
};

export default Education;
