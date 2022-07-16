const express = require("express");
const router = express.Router();

router.get("/categories", (req, res) => {
  res.send("Rota de categorias");
});

router.get("/categories/category/new", (req, res) => {
  res.send("Rota para criar novas categorias");
});

module.exports = router;
