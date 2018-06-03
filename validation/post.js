const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  dataFields = ["text"];

  if (!Validator.isLength(data.text, { min: 10, max: 400 })) {
    errors.text = "Post must be between 10 to 400 characters";
  }

  //Validate wether the required data fields are empty
  dataFields.forEach(field => {
    data[field] = !isEmpty(data[field]) ? data[field] : "";
    if (Validator.isEmpty(data[field])) {
      errors[field] = `${field} field is required`;
    }
  });

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
