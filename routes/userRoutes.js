// require the express module
const express = require('express');


// requiring the controller functions
const userController = require('./../controllers/userController');


// creating a new router object
const router = express.Router();


// defining the routes
router
  .route('/')
  .get(userController.getAllUsers);


// exporting the router object as default export
module.exports = router;