const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    dataFields = ['name','email','password','password2'];

    dataFields.forEach(field => {
        data[field] = !isEmpty(data[field]) ? data[field] : '' ;
        if(validator.isEmpty(data[field])) {
            errors[field] = `${field === 'password2'? 'Confirm password': field} field is required`;
        }
    });

    if(!validator.isLength(data.name, {min: 2, max: 30})){
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if(!validator.isLength(data.password, {min: 6, max: 30})){
        errors.password = 'Password must be between 6 and 30 characters'
    }

    if(!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if(!validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }




    return {
        errors,
        isValid: isEmpty(errors)
    };
};