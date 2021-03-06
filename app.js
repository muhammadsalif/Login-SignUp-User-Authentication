const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const cookieParser = require("cookie-parser");
const app = express()
var jwt = require('jsonwebtoken');
var cors = require("cors")
const authRoutes = require("./routes/authentication")
const { port, SERVER_SECRET } = require("./cors/index")
var { usersModel } = require("./database/models");

const server = http.createServer(app)
app.use(cors())
app.use(express.json());
app.use(cookieParser())

app.use("/auth", authRoutes)
// checking token
app.use((req, res, next) => {
  if (!req.cookies.jToken) {
    res.status(401).send("Token is missing")
    return;
  }
  jwt.verify(req.cookies.jToken, SERVER_SECRET, function (err, decodedData) {
    if (!err) {
      console.log("decoded data", decodedData)
      const issueDate = decodedData.iat * 1000;
      const nowDate = new Date().getTime();
      const diff = nowDate - issueDate; // 86400,000

      if (diff > 300000) { // expire after 5 min (in milis)
        res.status(401).send("token expired")
      } else { // issue new token
        ////////////////////////////////////////////////////
        // QUESTION TO BE ASKED
        var token = jwt.sign({
          id: decodedData.id,
          name: decodedData.name,
          email: decodedData.email,
        }, SERVER_SECRET)
        res.cookie('jToken', token, {
          maxAge: 86_400_000,
          httpOnly: true
        });
        req.body.jToken = decodedData
        next();
        ////////////////////////////////////////////////////
      }
    } else {
      res.status(401).send("invalid token")
    }
  });
})

app.get("/profile", (req, res, next) => {
  usersModel.findById(req.body.jToken.id, 'userName email',
    function (err, doc) {
      if (doc) {
        res.send({
          profile: doc
        })
      }
      if (!doc) {
        res.status(403).send({
          message: "user not exists"
        })
      }
      if (err) {
        res.status(500).send({
          message: "Internal server error"
        })
      }
    })
})

server.listen(port, () => {
  console.log(`Server is listening to port ${port}`)
})