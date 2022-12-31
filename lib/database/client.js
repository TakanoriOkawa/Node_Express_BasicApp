const path = require("path");
const { promisify } =  require("util"); // 非同期化するメソッド
const config = require("../../config/mysql.config.js");
const { sql } = require("@garafu/mysql-fileloader")({root: path.join(__dirname, "./sql")});
const mysql = require("mysql");

const con = mysql.createConnection({
  host: config.HOST,
  port: config.PORT,
  user: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE,
});


const MySQLClient = {
  connect: promisify(con.connect).bind(con),
  query: promisify(con.query).bind(con),
  end: promisify(con.end).bind(con),
};

module.exports = {
  MySQLClient,
  sql
};