// requiring the express module
const express = require("express");

// requiring the morgan module
const morgan = require("morgan");

// requiring the router for user
const userRouter = require("./routes/userRoutes");

// calls the express function
app = express();

// logging the request to console if we are in development mode
if (process.env.NODE_ENV === "development") {
  console.log(process.env.NODE_ENV);

  // middleware to log the request url and other details
  app.use(morgan("dev"));
}

// middleware to parse the req and res into json
app.use(express.json());

// defining routes
app.use("/api/v1/users", userRouter);

// exporting the app as default export
module.exports = app;
