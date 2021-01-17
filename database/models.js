const mongoose = require('mongoose');

/////////////////////////////////////////////////////////////////////////
// Mongoose connections
let dbURI = "mongodb://dbuser:dbpassword@cluster0-shard-00-02.d17rp.mongodb.net:27017,cluster0-shard-00-00.d17rp.mongodb.net:27017/Login_Signup?ssl=true&replicaSet=atlas-q0tc2t-shard-0&readPreference=primary&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1&3t.uriVersion=3&3t.connection.name=Login_signup&3t.databases=Login_Signup,admin&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true&3t.sslTlsVersion=TLS"

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected")
})

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected")
    process.exit(1);
})

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {  //this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
/////////////////////////////////////////////////////////////////////////
// Db Schemas & Models

var userSchema = new mongoose.Schema({
    userName: { type: String },
    email: { type: String },
    password: { type: String },
    createdOn: { type: Date, default: Date.now },
});

var usersModel = mongoose.model("users", userSchema);

module.exports = {
    usersModel, //or users only
    // orderModel: orderModel
}