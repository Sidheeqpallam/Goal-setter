const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


//@disc Register new User
//@api POST api/users/
//@access Public
const registerUser = asyncHandler(async (req, res)=>{
    console.log('register api');
    const {name , email, password} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error('Please fulfill the form.')
    }

    // check user exist 
    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error('User already exist.')
    }

    //Hass password 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        name, 
        email,
        password : hashedPassword
    });
    if(user){
        res.status(201).json({
            name : name,
            email : email,
            password : hashedPassword,
            token : generateToken(user._id)
        })
    }
})

//@disc Login User
//@api POST api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res)=>{
    const { email, password} = req.body;
    const user = await User.findOne({email});

    //check the password 
    if(user && await (bcrypt.compare(password, user.password))){
        res.status(200).json({
            name : user.name,
            email : email,
            password : user.password,
            token : generateToken(user._id)
        })
    }else {
        res.status(400);
        throw new Error('Invalid credentials.')
    }

})

//@disc Get user data
//@api get api/users/me
//@access Private
const getMe = asyncHandler(async (req, res)=>{
    res.status(200).json(req.user)
})


// Generate JWT
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : '30d'
    })
}

module.exports = {
    registerUser,
    loginUser, 
    getMe
}