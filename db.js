//including the mysql module
const mysql = require("mysql");

//creating connection with mysql database
const connection = mysql.createConnection({
  port:"2306",
  host: "localhost",
  user: "root",
  password: "1234"
})

//checking the connection with the server
connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
  console.log(`connection as id ${connection.threadId}`);
})

//if there is no database present, we create one, named 'tanslate_data'
connection.query("CREATE DATABASE IF NOT EXISTS translate_data;", (err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
  console.log(`Database created!`);
})

//creating a table in the database if not there named 'translations'
connection.query(`CREATE TABLE IF NOT EXISTS translate_data.translations (src_lang VARCHAR(64) NOT NULL,target_lang VARCHAR(64) NOT NULL,
  text VARCHAR(64) NOT NULL,
  translation VARCHAR(64) NOT NULL
) ENGINE=MEMORY;`, (err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
  console.log(`Table created!`);
})