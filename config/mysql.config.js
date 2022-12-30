// DBへ接続する設定
module.exports = {
  HOST: process.env.MYSQL_HOST || "127.0.0.1",
  PORT: process.env.MYSQL_PORT || "3306",
  USERNAME: process.env.MYSQL_USERNAME || "admin",
  PASSWORD: process.env.MYSQL_PASSWORD || "test1234",
  DATABASE: process.env.MYSQL_DATABASE || "tastylog"
};