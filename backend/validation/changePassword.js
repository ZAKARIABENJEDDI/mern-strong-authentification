const Validator = require("validator")
const IsEmpty = require("is-empty")

module.exports = ChangePasswordValidation = (data) => {
  const errors = {}
  data.password = !isEmpty(data.password) ? data.password : ""
  if (!Validator.isLength(data.password, {min:6 ,max:30})) {
    errors.password = "password schuld be more than 6 letters"
  }
}