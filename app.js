const PORT = process.env.PORT;
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");

const app = express();
// Express setting（無くても動作する）
app.set("view engine", "ejs");
app.disable("x-powered-by");

// 静的コンテンツのルーティング
app.use(favicon(path.join(__dirname, "/public/favicon.ico")));
app.use("/public", express.static(path.join(__dirname, "/public")));

// 動的コンテンツのルーティング
app.use("/", require("./routes/index.js"));

app.listen(PORT, () => {
  console.log("open server");
});