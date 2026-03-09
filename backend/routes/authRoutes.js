const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN
router.post("/login", async (req,res)=>{

 try{

  const {email,password} = req.body

  const user = await User.findOne({email})

  if(!user){
   return res.status(400).json({message:"User not found"})
  }

  const bcrypt = require("bcryptjs")

  const validPassword = await bcrypt.compare(password,user.password)

  if(!validPassword){
   return res.status(400).json({message:"Invalid password"})
  }

  const jwt = require("jsonwebtoken")

  const token = jwt.sign(
   {id:user._id},
   process.env.JWT_SECRET,
   {expiresIn:"1d"}
  )

  res.json({
   token,
   name:user.name,
   email:user.email
  })

 }catch(err){
  res.status(500).json(err)
 }

})

router.get("/all-users", async (req,res)=>{
 try{

  const users = await User.find()

  res.json(users)

 }catch(err){

  res.status(500).json({message:"Error fetching users"})

 }
})

module.exports = router;