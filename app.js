const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const cookieParser = require("cookie-parser");
const app = express()

const auth = require("./Routes/authentication")
const { authRoutes } = require("./routes/authentication")
const { usersModel } = require("./Database/models");
const { port } = require("./cors/index")

const server = http.createServer(app)

app.use(bodyParser.json());
app.use(cookieParser())

app.use("/auth", authRoutes)



server.listen(port, () => {
    console.log(`Server is listening to port ${port}`)
})