const Validator = require("validator")
const isEmpty = require("is-empty")


module.exports = ForgetPasswordValidation = (data) => {
  const errors = {}
  data.email = !isEmpty(data.email) ? data.email : ''

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email Form Invalid"
  }else if(isEmpty(data.emai)){
    errors.email = "Entrer L'email"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}