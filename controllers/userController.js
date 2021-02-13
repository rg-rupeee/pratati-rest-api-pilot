// requiring the AppError class
const AppError = require("../utils/appError");

// requiring the mongoose's user model
const User = require("./../models/userModel");

// requiring the APIFeatures class
const APIFeatures = require("./../utils/apiFeatures");

// requiring the catchAsync function
const catchAsync = require("./../utils/catchAsync");

// export getAllUsers function
exports.getAllUsers = catchAsync(async (req, res, next) => {
  // creating the query
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const users = await features.query;

  // sending the response
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

// export createUser function
exports.createUser = catchAsync(async (req, res, next) => {

  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      newUser,
    },
  });
});

// export updateUser function
exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // adding a 404 error if user does not exist
  if (!users) {
    return next(new AppError("No User found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// export getUser function
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  // adding a 404 error if user does not exist
  if(!user){
    return next(new AppError('No User found with that id', 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// export deleteUsers function
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  // adding a 404 error if user does not exist
  if(!user){
    return next(new AppError('No User found with that id', 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
