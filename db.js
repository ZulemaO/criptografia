const mongoose = require("mongoose");
//const { dburl } = require("./config/enviroment");

const Schema = mongoose.Schema;
//let config = require('./config/enviroment')


mongoose.connect("mongodb://localhost:27017/criptografia", {useUnifiedTopology: true, useNewUrlParser: true});
const connection = mongoose.connection;
connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
});

module.exports = mongoose