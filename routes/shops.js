const router = require("express").Router();
const { MySQLClient, sql } = require("../lib/database/client.js");

// SQLでの取得処理があるのでasyncをつける
router.get("/:id", async (req,res,next) => {
  const id = req.params.id;
  // 後々口コミ情報（_t_review？）他のテーブルからの取得処理と結合するので、Promise.allを使う。
  Promise.all([
    MySQLClient.executeQuery(
      await sql("SELECT_SHOP_DETAIL_BY_ID"),
      [id] // お店のID
    ),
    MySQLClient.executeQuery(
      await sql("SELECT_SHOP_REVIEW_BY_SHOP_ID"),
      [id]
    )
  ]).then(result => {
    const data = result[0][0];
    data.reviews = result[1] || []; // 必ず配列にしておく。
    res.render("./shops/index.ejs", data); // テンプレートへデータを送る
  }).catch(err => {
    next(err); // ログ出力へエラー内容を送る
  });
});

module.exports = router;