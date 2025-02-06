const express = require("express")
const route = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto");

const keys = require("../config/keys.js")
//validation register and login inputs
const ValidateRegisterInput = require("../validation/register.js")
const ValidateLoginInput = require("../validation/login.js")
const ForgetPasswordValidation = require("../validation/forgetpassword.js")
const ChangePasswordValidation = require("../validation/changePassword.js")
//User Modal
const User = require("../models/UserModel.js")
route.post("/register", async (req ,res) => {
  const data = req.body
  const {errors, isValid} = ValidateRegisterInput(data)
  if (!isValid) {
    return res.send({errors})
  }

  const UserExist = await User.findOne({email: data.email})
  if(UserExist){
    return res.send({echec:"Email already exist",validation:isValid})
  }
  else{
    const NewUser = new User()
    NewUser.name = data.name
    NewUser.email = data.email

    // hash password befor saving in database
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(data.password, salt, (err, hash) => {
        if(err) throw err
        NewUser.password = hash
        NewUser.save()
        .then((user) =>{
          if(user){
            return res.send({success:"User Added Sucssucfuly"})
          }
        }).catch((err) => {
          res.send({echec:err})
        })
      })
    })
  }
})

route.post("/login", async (req, res) => {
  try {
    const data = req.body;
    const { email, password } = data;
    
    if (!email || !password) {
      return res.json({
        error: "L'email et le mot de passe sont requis"
      });
    }

    const { error, isValid } = ValidateLoginInput(data);
    if (!isValid) {
      return res.json({
        error: error
      });
    }

    const FindUser = await User.findOne({ email: email });
    if (!FindUser) {
      return res.json({
        error: "Utilisateur non trouvé"
      });
    }

    const isMatch = await bcrypt.compare(password, FindUser.password);
    if (!isMatch) {
      return res.json({
        error: "Mot de passe incorrect"
      });
    }

    const payload = {
      id: FindUser.id,
      name: FindUser.name,
    };

    jwt.sign(
      payload,
      keys.secretOrKey,
      { expiresIn: 3156926 },
      (err, token) => {
        if (err) {
          return res.status(500).json({
            error: "Erreur lors de la génération du token"
          });
        }
        res.json({
          success: true,
          token: "Bearer " + token,
          message: "Connexion réussie"
        });
      }
    );
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      error: "Une erreur interne s'est produite"
    });
  }
});

route.post("/forget", async (req,res) => {
  const email = req.body.email
  const {errors, isValid} = ForgetPasswordValidation(email)
  const EmailExist = await User.findOne({email:email})

  if (!EmailExist) {
    return res.json({error:"User Not Exist"})
  }
  const code = crypto.randomInt(100000, 999999).toString();
  res.json({code:code})

})

route.post("/change_password", async (req, res) => {
  const data = req.body
  const {errors, isValid} = ChangePasswordValidation(data)
  const FindUser = await User.findOne({email:data.email})
  if(FindUser && isValid === true){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(data.password, salt, (err, hash) => {
        if(err) throw err
        const UpdateUser = await User.findOneAndUpdate({email:data.email},{password:hash})
        .then((UpdateUser) =>{
          if(UpdateUser){
            return res.send({success:"User Updated Sucssucfuly"})
          }
        }).catch((err) => {
          res.send({errors:err})
        })
      })
    })
  }else{
    res.send({errors:"Not Exist"})
  }

  // res.send({exist:FindUser,errors:errors})
})

module.exports = route