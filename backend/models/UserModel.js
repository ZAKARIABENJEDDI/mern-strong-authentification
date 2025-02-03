const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true
  },
  password:{
    type:String,
    require:true
  },
  date:{
    type:Date,
    require:Date.now
  },
})

const UserModule = mongoose.model("users",UserSchema)

module.exports = UserModule