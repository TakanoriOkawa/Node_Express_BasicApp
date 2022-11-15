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

// Static resource rooting.
app.use(favicon(path.join(__dirname, "/public/favicon.ico")));
app.use("/public", express.static(path.join(__dirname, "/public")));

// Access Logger
app.use(accesslogger());

// Dynamic resource rooting.
app.use("/", require("./routes/index.js"));

// 意図的にエラーを出す。エラーを出した後にapplicationloggerミドルウェアを実行しているの、コンソールに出力できる。
// ミドルウェアの実行後にエラーを投げても、何も起きないので注意
// app.get("/test", (req, res, next) => {
//   throw new Error("Something happened!"); // エラーを投げる
// });

// Set application log.
app.use(applicationlogger());


// Execute web application.
app.listen(PORT, () => {
  logger.application.info(`Application listening at :${PORT}`);
});
