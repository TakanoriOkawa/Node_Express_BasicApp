const router = require("express").Router();

router.get("/", (req,res) => {
  // viewフォルダーからの相対パス
  // ejsを読み込み
  res.render("./index.ejs");
});

module.exports = router;