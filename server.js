// requiring the dotenv package
const dotenv = require('dotenv');


// requiring the mongoose package
const mongoose = require('mongoose');


// configring enviorment variables from config.env
dotenv.config({path: './config.env'});


// requiring the app variable
const app = require('./app');


// defining the database variable
const DB = process.env.DATABASE.replace(
  '<PASSWORD>', 
  process.env.DATABASE_PASSWORD
)
// console.log(DB);


// connecting to the database
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
.then(()=> console.log("*** Successfully Connected to Database :) "));


// defining port
const port = process.env.port || 8080;


// starting the server
const server = app.listen(port, ()=>{
  console.log('App running on the port : ', port);
});