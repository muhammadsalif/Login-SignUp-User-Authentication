var express = require("express");

// Importing database models
var { usersModel } = require("../Database/models");

var authRoutes = express.Router();

///// Your API's here
authRoutes.post("/signup", (req, res) => {
    if (!req.body || !req.body.userName || !req.body.password) {
        
        res.status( 400).send(`
        Please 
        `)


        return;
    }
    Bcrypt.stringToHash(JSON.stringify(req.body.password))
        .then(passwordHash => {
            // // Mongo
            users.create({
                // id: Math.ceil(Math.random() * 100),
                userName: req.body.userName,
                password: passwordHash
            }).then(() => {
                res.send("Successfully signed up")
                console.log('Successfully sign up')
            }).catch(() => {
                res.send("Sign Up Error")
                console.log('Sign Up Error')
            })
            // // Local
            // users.push({
            // id: Math.ceil(Math.random() * 100),
            //     userName: req.body.userName,
            //     password: passwordHash
            // })
            // res.send("SignUp Successfully")
            // console.log("User Signup successfully :", req.body.userName)
        })
})





//////////////////

module.exports = authRoutes;