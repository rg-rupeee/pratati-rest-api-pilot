// requiring the mongoose module
const mongoose = require("mongoose");

// requiring the validator module
const validator = require("validator");

// creating a schema for users
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    requried: [true, "A user must have a name"],
    trim: true,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Provided email is not valid"],
  },
  phone: {
    type: Number,
    requried: [true, "A worker must have a mobile number"],
    // max: [10, "Mobile number must consist 10 digits"],
    // min: [10, "Mobile number must consist 10 digits"],
  },
  location: {
    type: String,
    default: "Indore",
    maxlength: 50,
  },
  serviceType: {
    type: String,
    required: [true, "Please provide what you do"],
    lowercase: true,
  },
  active: {
    // if false then user has deactivated his/her account
    type: Boolean,
    default: true,
    select: false,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // works only on CREATE and SAVE
      validator: function (el) {
        // el-> passwordConfirm feild
        // this.password -> password feild

        return el === this.password;
      },
      message: "Passwords are not same",
    },
  },
  role: {
    type: String,
    default: "user",
    enum: {
      values: ["user", "admin", "employee"],
      message: "Must be either user, admin, employee",
    },
  },
});

// pre query middleware : runs before all find queries
userSchema.pre(/^find/, function (next) {
  // using the regular js function to access current query

  // do not select tours in which active = false and role is admin or employee
  this.find({ $and: [{ active: { $ne: false } }, { role: { $ne: "admin" } }, {role: { $ne: 'employee'}}] });

  next();
});


// creating a model from schema
const User = mongoose.model("User", userSchema);

//exporting the model as default export
module.exports = User;
