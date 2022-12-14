const { promisify } =  require("util"); // 非同期化するメソッド
const config = require("../../config/mysql.config.js");
const mysql = require("mysql");

const pool = mysql.createPool({
  host: config.HOST,
  port: config.PORT,
  user: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE,
  connectionLimit: config.CONNECTION_LIMIT,
  queueLimit: config.QUEUE_LIMIT,
});

function executeQuery(query,val){
  return new Promise((resolve,reject) => {
    pool.query(query, val, (err, results) => {
      if(err) {
        reject("failed query!");
      }
      resolve(results);
    });
  });
}

module.exports = {
  pool,
  getConnection: promisify(pool.getConnection).bind(pool),
  executeQuery,
  releaseConnection: function(connection) {
    connection.release(); // コネクションを戻すやつ
  },
  end: promisify(pool.end).bind(pool),
};
