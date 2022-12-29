// DBへ接続する設定
module.exports = {
  HOST: process.env.MYSQL_HOST,
  PORT: process.env.PORT,
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE
};