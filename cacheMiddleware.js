const mysql = require("mysql");//getting the package mysql

//creating connection with the database
const connection = mysql.createConnection({
  port:"2306",
  host: "localhost",
  user: "root",
  password: "1234",
  database: "translate_data"
})

//request would reach here at first, if the same query is already requested by a previous user api wouldn't be called and data
// would be fetched else the query would be forwarded on to smartCache
const cacheMiddleware = async (req, res, next) => {
  const { src_lang, target_lang, text } = req.query;
  connection.query({
    sql: `SELECT * FROM translations where src_lang="${src_lang}" and target_lang="${target_lang}" and text="${text}";`,
    timeout: 40000,
  }, (err, results) => {
    if (err) {
      console.log(err)
      return res.status(500).send("DB Error occured!");
    }
    if (results.length !== 0){
      return res.status(200).send({ ...results[0] })//?spread operator -destructuring
    }
    next();
  });
}

//exporting this module as required in route.js
module.exports = cacheMiddleware;