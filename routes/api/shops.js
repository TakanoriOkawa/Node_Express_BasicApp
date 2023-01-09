const router = require("express").Router();
const { MySQLClient, sql } = require("../../lib/database/client.js");

router.get("/:id", async (req,res,next) => {
  const id = req.params.id;
  Promise.all([
    MySQLClient.executeQuery(
      await sql("SELECT_SHOP_DETAIL_BY_ID"),
      [id] 
    ),
    MySQLClient.executeQuery(
      await sql("SELECT_SHOP_REVIEW_BY_SHOP_ID"),
      [id]
    )
  ]).then(result => {
    console.log(result);
    const data = result[0][0];
    data.reviews = result[1] || [];

    res.status(200).json(data); // JSON返却
  }).catch(err => {
    next(err);
  });
});

module.exports = router;