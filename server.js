// requiring the app variable
const app = require('./app');


// defining port
const port = process.env.port || 8080;


// starting the server
const server = app.listen(port, ()=>{
  console.log('App running on the port : ', port);
});