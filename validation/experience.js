const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  dataFields = ["title", "company", "from"];

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
