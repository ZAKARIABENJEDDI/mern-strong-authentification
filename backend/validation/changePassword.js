const Validator = require("validator")
const IsEmpty = require("is-empty")

module.exports = ChangePasswordValidation = (data) => {
  const errors = {}
  data.password = !IsEmpty(data.password) ? data.password : ""
  data.password2 = !IsEmpty(data.password2) ? data.password2 : ""
  if (!Validator.isLength(data.password, {min:6 ,max:30})) {
    errors.password = "Password must be at least 6 charachters"
  }

  if(Validator.isEmpty(data.password)){
    errors.password = "Enter Password"
  }

  if (!Validator.equals(data.password,data.password2)) {
    errors.password2 = "Les Deux Password Doivent Etre Equax"
  }

  return {
    errors,
    isValid: IsEmpty(errors)
  }
}