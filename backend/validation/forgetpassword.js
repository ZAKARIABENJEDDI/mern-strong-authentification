const Validator = require("validator")
const isEmpty = require("is-empty")


module.exports = ForgetPasswordValidation = (email) => {
  const errors = {}
  email = !isEmpty(email) ? email : ""
  if (!Validator.isEmail(email)) {
    errors.email = "Email Form Invalid"
  }
  if(Validator.isEmpty(email)){
    errors.email = "Entrer L'email"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}