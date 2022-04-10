const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    //console.log("xxxx")
    // console.log(data.firstname);

    // Convert empty fields to an empty string so we can use validator functions
    data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
    data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
    //data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";

    // firstname checks
    if (Validator.isEmpty(data.firstname)) {
        errors.firstname = "First Name field is required";
    }
    //last name
    if (Validator.isEmpty(data.lastname)) {
        errors.lastname = "Last Name field is required";
    }
    // phonenumber checks
    if (Validator.isEmpty(data.phoneNumber)) {
        errors.phoneNumber = "phoneNumber field is required";
    } else if (!Validator.isMobilePhone(data.phoneNumber)) {
        errors.phoneNumber = "PhoneNumber is invalid";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
