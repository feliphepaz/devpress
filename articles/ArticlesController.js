const express = require("express");
const router = express.Router();

router.get("/articles", (req, res) => {
  res.send("Rota de artigos");
});

router.get("/articles/article/new", (req, res) => {
  res.send("Rota para criar novos artigos");
});

module.exports = router;
