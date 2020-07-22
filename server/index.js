const express = require('express')
const app = express()
const bodyParser = require('body-parser')

//Initialize environment variables
require('dotenv').config()

// Support parsing of application/json type post data
app.use(bodyParser.json());

// Support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

//Serve Front-End
app.use(express.static('./client/dist'))

//Import the router and use it
const router = require("./router");
app.use("/api",router);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Listening on PORT ${process.env.PORT || 3001}`);
});