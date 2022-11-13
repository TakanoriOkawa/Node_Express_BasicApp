const log4js = require("log4js");
const config = require("../../config/log4js.config");

let console;
log4js.configure(config);

// log4jsの情報を追加したconsoleを用意
console = log4js.getLogger();

module.exports = {
  console
};