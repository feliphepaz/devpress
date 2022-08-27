const express = require("express");
const router = express.Router();
const Article = require("../articles/Article");
const Category = require("../categories/Category");
const Slugify = require("slugify");

router.get("/admin/articles", (req, res) => {
  Article.findAll({
    include: [{ model: Category }],
  }).then((articles) => {
    res.render("admin/articles/index", { articles });
  });
});

router.get("/admin/articles/new", (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/articles/new", { categories });
  });
});

router.get("/admin/articles/edit/:id", (req, res) => {
  const id = req.params.id;
  Article.findOne({
    where: {
      id,
    },
  }).then((article) => {
    Category.findAll().then((categories) => {
      res.render("admin/articles/edit", { categories, article });
    });
  });
});

router.get("/articles/:slug", (req, res) => {
  const slug = req.params.slug;
  if (slug) {
    Article.findOne({
      where: {
        slug,
      },
      include: [{ model: Category }],
    }).then((article) => {
      Category.findAll().then((categories) => {
        res.render("article", { article, categories });
      });
    });
  } else {
    res.redirect("/");
  }
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

router.post("/articles/edit", (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const category = req.body.category;
  const id = req.body.id;
  if (title) {
    Article.update(
      {
        title,
        slug: Slugify(title),
        body,
        categoriaId: category,
      },
      {
        where: {
          id,
        },
      }
    ).then(() => {
      res.redirect("/admin/articles");
    });
  } else {
    res.redirect("/admin/articles");
  }
});

router.get("/articles/delete/:id", (req, res) => {
  const id = req.params.id;
  if (id) {
    Article.destroy({
      where: {
        id,
      },
    }).then(() => {
      res.redirect("/admin/articles");
    });
  } else {
    res.redirect("/admin/articles");
  }
});

module.exports = router;
