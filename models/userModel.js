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
  },
});

//creating a model from schema
const User = mongoose.model("User", userSchema);

//exporting the model as default export
module.exports = User;