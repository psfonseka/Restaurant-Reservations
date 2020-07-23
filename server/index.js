const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

//Initialize environment variables
require('dotenv').config()

//Set port based on environmental variable or default to 3001
const port = process.env.PORT || 3001;

// Make io accessible to our router
app.use((req,res,next) => {
  req.io = io;
  next();
});

// Support parsing of application/json type post data
app.use(bodyParser.json());

// Support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

//Serve Front-End
app.use(express.static('./client/dist'))

//Import the router and use it
const router = require("./router");
app.use("/api",router);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', function(){
      console.log('user disconnected');
    });
});

http.listen(port, () => {
  console.log(`Listening on PORT ${port}`);
});