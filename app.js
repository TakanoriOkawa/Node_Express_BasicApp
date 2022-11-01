const PORT = process.env.PORT;
const express = require("express");
const path = require("path");

const app = express();

// 静的コンテンツのルーティング
app.use("/public", express.static(path.join(__dirname, "/public")));

// 動的コンテンツのルーティング
app.use("/", require("./routes/index.js"));

app.listen(PORT, () => {
  console.log("open server");
});