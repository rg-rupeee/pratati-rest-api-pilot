// requiring the AppError class
const AppError = require("../utils/appError");

// requiring the mongoose's user model
const User = require("./../models/userModel");

// requiring the catchAsync function
const catchAsync = require("./../utils/catchAsync");

// requiring json web token package
const jwt = require("jsonwebtoken");
const { findOne } = require("./../models/userModel");

// signup = user registration
exports.signup = catchAsync(async (req, res, next) => {
  // user cannot set itself a role
  if (req.body.role) {
    req.body.role = undefined;
  }

  const newUser = await User.create(req.body);

  // signing the jwt : creating a json web token
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: "success",
    token,
    data: {
      newUser,
    },
  });
});

// logging user in
exports.login = catchAsync(async (req, res, next) => {
  const { email, phone, password } = req.body;

  // check if email or phone number exists
  if (!email && !phone) {
    return next(
      new AppError(
        "Either provide phone number or registered email id to login",
        400
      )
    );
  }

  //  check if password exists
  if (!password) {
    return next(new AppError("please provide password", 400));
  }
  
  // check if user exists
  let user;
  
  // if email is provided then find user using email
  if(email){
    user = await User.findOne({email}).select('+password');
    if(!user){
      return next(new AppError('Incorrect email', 401));
    }
  }
  
  // if phone is provided then find user using phone iff user not found 
  if(phone && !user){
    user = await User.findOne({phone}).select('+password');
    if(!user){
      return next(new AppError('Incorrect phone number', 401));
    }
  }

  // match the provided password with our encrypted password using instance methods
  if(!(await user.correctPassword(password, user.password))){
    // return error if both password does not matches
    return next(new AppError('Incorrect password', 401));
  }

  // if everything is ok send jwt token to client

  // signing the jwt : creating a json web token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // console.log(user);
  user.password = undefined;
  res.status(200).json({
    status: 'success',
    token,
    user
  });
});

// user updating his/her data
exports.updateMe = catchAsync(async (req, res, next) => {});

// user deleting its account : making account invisible
exports.deleteMe = catchAsync(async (req, res, next) => {});
