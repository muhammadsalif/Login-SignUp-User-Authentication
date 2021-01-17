var express = require("express");
var bcrypt = require('bcrypt-inzi');
var jwt = require('jsonwebtoken');
var { SERVER_SECRET } = require('../cors/index')

// Importing database models
var { usersModel } = require("../Database/models");

var authRoutes = express.Router();

///// Your API's here
authRoutes.post("/signup", (req, res) => {
    if (!req.body || !req.body.userName || !req.body.email || !req.body.password) {
        res.status(400).send(`
        Please provide complete information
        {
            "userName" :"abc",
            "email" :"abc@gmail.com",
            "password" :"abc"
        }
        `)
        return;
    }
    usersModel.findOne({ email: req.body.email }, function (err, doc) {
        if (doc) {
            res.status(409).send({
                message: "Email already exists please use another email"
            })
        }
        if (err) {
            res.status(500).send({
                message: "Internal server error"
            })
        }
        if (!doc) {
            bcrypt.stringToHash(JSON.stringify(req.body.password))
                .then(passwordHash => {
                    usersModel.create({
                        userName: req.body.userName,
                        email: req.body.email,
                        password: passwordHash
                    }).then(() => {
                        res.send("Successfully signed up")
                    }).catch(() => {
                        res.send("Sign Up Error")
                    })
                })
        }
    })
})

authRoutes.post("/login", (req, res) => {
    if (!req.body || !req.body.email || !req.body.password) {
        res.status(400).send(`
        Please provide complete information
        {
            "email" :"abc@gmail.com",
            "password" :"abc"
        }
        `)
        return;
    }
    usersModel.findOne({ email: req.body.email }, function (err, doc) {
        if (err) {
            res.status(500).send({
                message: "Internal server error"
            })
        }
        if (!doc) {
            res.status(404).send({
                message: "Email does not exists please sign up"
            })
        }
        if (doc) {
            bcrypt.varifyHash(JSON.stringify(req.body.password), doc.password)
                .then(isMatched => {
                    if (isMatched) {
                        let tokenData =
                            jwt.sign(
                                {
                                    id: doc._id,
                                    email: doc.email,
                                    userName: doc.userName,
                                }, SERVER_SECRET
                            );
                        res.cookie('jToken', tokenData, {
                            maxAge: 86_400_000,
                            httpOnly: true
                        });
                        res.send({
                            message: "login success",
                            user: {
                                email: req.body.email,
                                userName: req.body.userName,
                            }
                        });
                    }
                    else {
                        res.status(401).send({
                            message: "Incorrect password"
                        })
                    }
                }).catch(e => {
                    console.log("error: ", e)
                })
        }
    })
})

authRoutes.post("/logout", (req, res) => {
    res.cookie('jToken', "", {
        maxAge: 86_400_000,
        httpOnly: true
    });
    res.send("logout success");
})

//////////////////
module.exports = authRoutes;