var express = require("express");

// Importing database models
var {users} = require("../Database/models"); 
console.log("userModel: ", users);

var auth = express.Router();

///// Your API's here


//////////////////

module.exports = auth;