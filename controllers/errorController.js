// requiring appError class
const AppError = require('./../utils/appError');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    code: err.code,
    name: err.name,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    // operational, trusted error
    // send message to client
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // non operational , programming or other unkown errors
    // do not leak details to client

    // logging error to console
    console.log("ERRORRRRRRRRR  >---> ", err);

    // sending generic message
    res.status(500).json({
      status: "error",
      message: "ERROR: something went wrong.......",
    });
  }
};

// invalid id of monogodb
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

// unique: true feilds , duplicate feilds errors
const handleDuplicateFieldsDB = (err) => {
  console.log('duplicate field error');
  // console.log(err);
  // const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  let value = err.keyValue;
  value = value.email
  // console.log(value.email);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

// validation error of mongoose
const handleValidationErrorDB = (err) => {
  console.log("validation errrrrrorrr");
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

// exporting the global error handling middleware function
module.exports = (err, req, res, next) => {
  // console.log(err);  
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";


  if (process.env.NODE_ENV === "development") {
    // sending errors in development mode
    sendErrorDev(err, res);
  } else {
    let error = {...err};
    //  console.log(error._message);
    
    // invalid id of monogodb
    if (error.name === "CastError") error = handleCastErrorDB(error);
    
    // unique: true feilds , duplicate feilds error
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    
    // validation error of mongoose
    if (error._message === "User validation failed"){
      // console.log('rrr: validation errrorr');
      error = handleValidationErrorDB(error);
    }
    
    // sending errors in production mode
    sendErrorProd(error, res);
  }
};
