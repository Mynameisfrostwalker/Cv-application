import { useState } from "react";

/**
 * useValidate Custom Hook
 * @param {Object} validState - Initial Valid Object
 * @param {Object} errState - Initial errorMessage Object
 * @param {*} change - OnChange function
 * @return {Array}
 */
const useValidate = (validState, errState, change) => {
  const [valid, setValid] = useState(validState);
  const [err, setErrmessage] = useState(errState);

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

  return [valid, err, handleInvalidate];
};

export default useValidate;
