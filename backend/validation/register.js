const Validator = require("validator")
const isEmpty = require("is-empty")

module.exports = function ValidateRegisterInput(data){
  let errors = {}

  // verfication des champ non vide si oui return ''
  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.password2 = !isEmpty(data.password2) ? data.password2 : ''

  // implementation d'bojet errors si un champ est vide
  Validator.isEmpty(data.name) ? errors.name = "Name is required" : ''

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required"
  }else if(!Validator.isEmail(data.email)) { // verification si data.email a le form d'email
    errors.email = "Email Form not valid"
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Passord is required"
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password is required"
  }
  // la longueure de passowrd doit > 6 charactere et < 30
  if (!Validator.isLength(data.password, {min:6 ,max:30})) {
    errors.password = "Password must be at least 6 charachters"
  }
  // les deux password sont les memes
  if(!Validator.equals(data.password, data.password2)){
    errors.password2 = "Password must match"
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}