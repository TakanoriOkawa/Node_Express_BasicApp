const PORT = process.env.PORT || 3000;
const path = require("path");
const logger = require("./lib/log/logger.js");
const applicationlogger = require("./lib/log/applicationlogger.js");
const accesslogger = require("./lib/log/accesslogger.js");
const express = require("express");
const favicon = require("serve-favicon");
const app = express();

// Express settings
app.set("view engine", "ejs");
app.disable("x-powered-by");

// Expose global method to view engine
app.use((req,res,next) => {
  // ここで渡しているのがレスポンスのオブジェクトに追加して渡している
  res.locals.moment = require("moment");
  res.locals.padding = require("./lib/math.js").padding;
  next();
});

// Static resource rooting.
app.use(favicon(path.join(__dirname, "/public/favicon.ico")));
app.use("/public", express.static(path.join(__dirname, "/public")));

// Access Logger
app.use(accesslogger());

// Dynamic resource rooting.
app.use("/", require("./routes/index.js"));
app.use("/shops", require("./routes/shops.js"));

// ここでは意図的にエラーを出す。エラーを出した後にapplication_loggerミドルウェアを実行している。コンソールに出力できる。
// ミドルウェアの実行後にエラーを投げても、何も起きないので注意
// app.get("/test", (req, res, next) => {
//   throw new Error("Something happened!"); // エラーを投げる
// });

// Set application log.
// このミドルウェアを実行する前に、既にエラーが投げられている場合、エラーを出力する
app.use(applicationlogger());


// Execute web application.
app.listen(PORT, () => {
  logger.application.info(`Application listening at :${PORT}`);
});
