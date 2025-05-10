const User = require('../models/user')
const {hashPassword , comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken')


const test = (req, res) => {
  res.json('test is working')
}

//register endpoint 
const registerUser = async(req, res) =>{
  try {
    const {name , email , password, phone, type} = req.body;
    //check if name is entered
    if(!name){
      return res.json({
        error: 'name is required'
      })
    }
    //check if pass is good 
    if(!password || password.length < 6){
      return res.json({
        error: 'password is required and should be at least 6 chracters long'
      })
    }
    if(!email){
      return res.json({
        error: 'email is required'
      })
    }
    //check email
    const exist = await  User.findOne({email})
    if(exist){
      return res.json({
        error: 'email is taken'
      })
    }
    //check phone 
    if(phone.length < 10){
      return res.json({
        error: 'phone no should be 10 digits'
      })
    }
    //check user type
    if(!type){
      return res.json({
        error: 'please select user type'
      })
    }

    const hashedPassword = await hashPassword(password)
    //create user in database
    const user = await User.create({
      name,
      email,
      phone, 
      password: hashedPassword, 
      type
    })

    return res.json(user)
  } catch (error) {
    console.log(error)
  }
}

//login endpoint
const loginUser = async(req,res) =>{
try {
   const {email , password} = req.body;

   //check if user exist
   const user = await User.findOne({email})
   if(!email){
    return res.json({
        error: "please enter registered email"
    })
   }
   else if(!user){
    return res.json({
      error: "user email does not exist"
    })
   }
   //check if password entered
   const match = await comparePassword(password, user.password)
   if(!password){
    return res.json({
      error: "please enter password"
    })
   }
   //check if password match
   else if(match){
    jwt.sign({email:user.email, id:user._id, name:user.name, type:user.type}, process.env.JWT_SECRET, {},(err ,token) =>{
      if(err) throw err;
      res.cookie('token', token).json({token, user})
    })
  }else{
    return res.json({
      error: "invalid password"
    })
  }
  //res.json({type:user.type})
  } 
  catch (error) {
      console.log(error)
 }
}



module.exports = {    
    test,
    registerUser,
    loginUser
}