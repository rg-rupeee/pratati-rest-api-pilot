// requiring the AppError class
const AppError = require("../utils/appError");

// requiring the mongoose's user model
const User = require("./../models/userModel");

// requiring the catchAsync function
const catchAsync = require("./../utils/catchAsync");

// requiring json web token package
const jwt = require('jsonwebtoken');

/**
 {
   name: req.body.name,
   email: req.body.name,
   phone: req.body.phone,
   password: req.body.password,
   passwordConfirm: req.body.passwordConfirm,
   location: req.body.location,
   serviceType: req.body.serviceType,
    createdBy: 'user'
  }
  */
// signup = user registration
exports.signup = catchAsync(async (req, res, next)=>{
  
  // user cannot set itself a role
  if(req.body.role){
    req.body.role = undefined;
  }
  
  const newUser = await User.create(req.body);
  
  // signing the jwt : creating a json web token
  const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    })
    
  res.status(201).json({
    status: "success",
    token,
    data: {
      newUser,
    },
  });
});

// logging user in
exports.login = catchAsync(async (req, res, next)=>{

});

// user updating its data
exports.updateMe = catchAsync(async (req, res, next)=>{

});

// user deleting its account : making account invisible
exports.deleteMe = catchAsync(async (req, res, next)=>{

});