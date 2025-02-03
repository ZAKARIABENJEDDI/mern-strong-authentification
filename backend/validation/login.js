const isEmpty = require("is-empty")
const Validator = require("validator")

module.exports = function ValidateLoginInputs(data){

  let errors = {}

  data.email = !isEmpty(data.email) ? data.email : ""
  data.password = !isEmpty(data.password) ? data.password : ""
  
  // email login validation
  if(!Validator.isEmail(data.email)){
    errors.email = "Email Form Invalid"
  }else if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required" 
  }

  // password login validation
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required" 
  }

  return {
    errors,
    isValid : isEmpty(errors)
  }
}