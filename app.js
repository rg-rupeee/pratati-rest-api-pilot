// requiring the express module
const express = require('express');


// requiring the router for user
const userRouter = require('./routes/userRoutes');


// calls the express function
app = express();


// middleware to parse the req and res into json
app.use(express.json());  


// defining routes
app.use('/api/v1/users', userRouter);


// exporting the app as default export
module.exports = app;