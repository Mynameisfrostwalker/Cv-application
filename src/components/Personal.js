import React from "react";
import PropTypes from "prop-types";
import Inputs from "./Inputs";
import personal from "../styles/personal.module.css";
import "@fortawesome/fontawesome-free/js/all";

/**
 * @module Personal
 */

/**
 * Personal component
 */
class Personal extends React.Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      valid: {
        photo: "null",
        title: "null",
        firstName: "null",
        lastName: "null",
        number: "null",
        mail: "null",
        address: "null",
      },
      errmessage: {
        photo: "null",
        title: "null",
        firstName: "null",
        lastName: "null",
        number: "null",
        mail: "null",
        address: "null",
      },
    };
    this.handleInvalidate = this.handleInvalidate.bind(this);
    this.validator = this.validator.bind(this);
    this.showError = this.showError.bind(this);
  }

  /**
   * Form Validation
   * @param {Object} e
   */
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

  /**
   * Form Validation
   * @param {Object} event
   */
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

  /**
   * shows errors
   * @param {Object} input
   * @param {Object} obj - Invalid state
   * @param {string} goal - Input id
   */
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
    const { values, submit, imgsrc, handleImg } = this.props;
    return (
      <form className={personal.formstyle} onSubmit={submit}>
        <Inputs
          hfor="photo"
          kind="file"
          acc="image/*"
          imgChange={handleImg}
          imgsrc={imgsrc[0]}
          invalid={this.handleInvalidate}
          displayinvalid={valid.photo}
          errormessage={errmessage.photo}
          value={values.photo[0]}
        />
        <Inputs
          hfor="title"
          name=""
          type="select"
          invalid={this.handleInvalidate}
          displayinvalid={valid.title}
          errormessage={errmessage.title}
          value={values.title[0]}
        />
        <Inputs
          hfor="firstName"
          kind="text"
          name="First Name*"
          req
          invalid={this.handleInvalidate}
          displayinvalid={valid.firstName}
          errormessage={errmessage.firstName}
          value={values.firstName[0]}
        />
        <Inputs
          hfor="lastName"
          kind="text"
          name="Last Name*"
          req
          invalid={this.handleInvalidate}
          displayinvalid={valid.lastName}
          errormessage={errmessage.lastName}
          value={values.lastName[0]}
        />
        <Inputs
          hfor="mail"
          kind="email"
          name="Email*"
          req
          invalid={this.handleInvalidate}
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
          invalid={this.handleInvalidate}
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
          invalid={this.handleInvalidate}
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
  }
}

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
