const express=require('express');
const { registerUser, userSignIn } = require('../controllers/authController');
const { updloadUserImage } = require('../middlewares/uploadUserImage');
const { verifyToken } = require('../middlewares/verifyToken');

const authRoutes=express.Router();

// register user route
authRoutes.post('/register',updloadUserImage.single('image'),registerUser)

// login user route
authRoutes.post('/login',userSignIn);


module.exports={authRoutes}