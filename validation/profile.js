const Validator = require("validator");
const isEmpty = require("./is-empty");
const { socialFields } = require("../models/Profile");

module.exports = function validateProfileInput(data) {
  let errors = {};
  console.log(JSON.stringify(data));
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";
  data.website = !isEmpty(data.website) ? data.website : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 and 4 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills field is required";
  }

  if (!Validator.isEmpty(data.website) && !Validator.isURL(data.website)) {
    errors.website = "Invalid URL";
  }

  socialFields.forEach(field => {
    if (!isEmpty(data[field])) {
      if (!Validator.isURL(data[field])) {
        errors[field] = "Not a valid URL";
      }
    }
  });

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
