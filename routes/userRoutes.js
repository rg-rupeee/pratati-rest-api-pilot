// require the express module
const express = require("express");

// requiring the controller functions
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

// creating a new router object
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.patch("/updateMe", authController.protect ,  authController.updateMe);
router.delete("/deleteMe", authController.protect ,  authController.deleteMe);

// defining the routes
router
  .route("/")
  .get(userController.getAllUsers)
  .post(authController.protect , userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(authController.protect , userController.updateUser)
  .delete(authController.protect , userController.deleteUser);

// exporting the router object as default export
module.exports = router;