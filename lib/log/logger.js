const log4js = require("log4js");
const config = require("../../config/log4js.config");

let console, application, access;
log4js.configure(config);

// log4jsの情報を追加したconsoleを用意
console = log4js.getLogger();

// Application Logger
application = log4js.getLogger("application");

// Access Logger
access = log4js.getLogger("access");

module.exports = {
  console,
  application,
  access
};