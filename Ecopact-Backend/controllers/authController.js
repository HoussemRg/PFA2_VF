const asyncHandler=require('express-async-handler');
const {validateRegisterUser,validateLoginUser,User}=require('../Models/User')
const bcrypt=require('bcrypt')
const fs=require('fs')
const path=require('path');
/***---------------------------
 * @desc Register new user
 * @Route /api/auth/register
 * @Request post
 * @access public
-----------------------------*/
const registerUser= asyncHandler (async (req,res)=>{
    const {error}=validateRegisterUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let user=await User.findOne({email:req.body.email});
    if(user) return res.status(400).send("User already exists");
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);
    user= new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:hashedPassword,
        phoneNumber:req.body.phoneNumber,
        profilePhoto:req.file ? req.file.buffer : fs.readFileSync(path.join(__dirname,'../assets/profilePhoto.jpg')) 
    });
    await user.save();
    return res.status(200).send("user created successfully");
})


/***---------------------------
 * @desc Login user
 * @Route /api/auth/login
 * @Request post
 * @access public
-----------------------------*/
const userSignIn = asyncHandler(async(req,res)=>{
    const {error} = validateLoginUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user || !(await bcrypt.compare(password,user.password))){
        return res.status(400).send('Invalid email or password');
     }
     const token=user.generateAuthToken();
     return res.status(201).send({
        id: user._id,
        isAdmin: user.isAdmin,
        token: token,
        firstName:user.firstName,
        lastName:user.lastName,
        email: user.email,
        profilePhoto: user.profilePhoto,
        phoneNumber: user.phoneNumber,
        isAccountVerified: user.isAccountVerified
     })

})

module.exports={registerUser,userSignIn}