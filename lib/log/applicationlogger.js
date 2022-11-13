const logger = require("./logger.js");

module.exports = function(options) {
  return function (err, req, res, next) {
    console.log("通常コンソール");
    logger.console.log("loggerの表示");
    logger.application.error(err.message); // エラーを表示させる
    next(err); // 次のミドルウェアに飛ぶ為に必要。無いとシステムが止まる
  };
};