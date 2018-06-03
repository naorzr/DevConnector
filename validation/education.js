const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  dataFields = ["school", "degree", "fieldOfStudy", "from"];

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
