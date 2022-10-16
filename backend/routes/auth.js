const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {registerValidation, loginValidation} = require('../validation')


router.post('/register', async(req, res) => {

  const {error} = registerValidation(req.body)
  if(error) return res.status(400).json({error: error.details[0].message})

  //email exists condition
  const emailExists = await User.findOne({email: req.body.email})
  if(emailExists) return res.status(400).json({error: "Email already exists"})

  //Hashing the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  //create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    pic: req.body.pic
  });

  try{
    const savedUser = await user.save();
    res.status(200).json({'message' : "saved successfully"})
    
  }catch(err){
    return res.status(400).json(err)
  }
})

router.post("/login" ,async (req, res) => {
  // validation
  const {error} = loginValidation(req.body)
  if(error) return res.status(400).json({error:error.details[0].message})

  //email exists condition
  const user = await User.findOne({email: req.body.email})
  if(!user) return res.status(400).json({error:"Email or password is not correct"})

  //password is correct or not
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if(!validPassword) return res.status(400).json({error:"Incorrect password"})

  //create jwt token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
  res.header("auth-token", token)
  res.json({user,token,message: "Login successfully"})

})

router.get('/getalluser', (req, res) => {
  User.find()
  .then(users => {
    res.json({users})
  })
  .catch(err => {
    console.log(err);
  })
})


module.exports = router