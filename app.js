const PORT = process.env.PORT;
const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req,res) => {
  res.end("Hello World");
});

// 静的コンテンツのルーティング
app.use("/public", express.static(path.join(__dirname, "/public")));


app.listen(PORT, () => {
  console.log("open server");
});