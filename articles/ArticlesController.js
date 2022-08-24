const express = require("express");
const router = express.Router();
const Article = require("../articles/Article");
const Category = require("../categories/Category");
const Slugify = require("slugify");

router.get("/admin/articles", (req, res) => {
  res.send("Rota de artigos");
});

router.get("/admin/articles/new", (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/articles/new", { categories });
  });
});

router.post("/articles/save", (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const category = req.body.category;
  if (title && body && category) {
    Article.create({
      title,
      slug: Slugify(title),
      body,
      categoriaId: category,
    }).then(() => {
      res.redirect("/admin/articles");
    });
  } else {
    res.redirect("/admin/articles");
  }
});

module.exports = router;
