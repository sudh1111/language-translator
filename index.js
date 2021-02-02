//including required modules
const express = require("express");
const mysql = require("mysql");
require("./db");
const app = express();

//using route 
app.use(require("./route"));

//starting the server
app.listen(1010, () =>
{
    console.log(`Server is up at Port number 1010`)
});