const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.accountnumber = !isEmpty(data.accountnumber) ? data.accountnumber : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email checks
  if (Validator.isEmpty(data.accountnumber)) {
    errors.accountnumber = "AccountNumber field is required";
  } else if (!Validator.isNumeric(data.accountnumber)) {
    errors.accountnumber = "AccountNumber is invalid";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
