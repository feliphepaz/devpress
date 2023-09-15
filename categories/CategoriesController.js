const express = require("express");
const router = express.Router();
const Category = require("./Category");
const Slugify = require("slugify");
const Article = require("../articles/Article");
const adminAuth = require("../middlewares/adminAuth");

router.get("/admin/categories", adminAuth, (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/categories/index", { categories });
  });
});

router.get("/admin/categories/new", adminAuth, (req, res) => {
  res.render("admin/categories/new");
});

router.post("/categories/save", adminAuth, (req, res) => {
  const title = req.body.title;
  if (title) {
    Category.create({
      title,
      slug: Slugify(title),
    }).then(() => {
      res.redirect("/admin/categories");
    });
  } else {
    res.redirect("/admin/categories/new");
  }
});

router.post("/categories/edit", adminAuth, (req, res) => {
  const title = req.body.title;
  const id = req.body.id;
  if (title) {
    Category.update(
      {
        title,
        slug: Slugify(title),
      },
      {
        where: {
          id,
        },
      }
    ).then(() => {
      res.redirect("/admin/categories");
    });
  } else {
    res.redirect("/admin/categories");
  }
});

router.get("/categories/delete/:id", adminAuth, (req, res) => {
  const id = req.params.id;
  if (id) {
    Category.findOne({
      where: {
        id,
      },
      include: [{ model: Article }],
    }).then((category) => {
      category.articles.forEach((article) => {
        Article.destroy({
          where: {
            id: article.id,
          },
        });
      });
    });

    Category.destroy({
      where: {
        id,
      },
    }).then(() => {
      res.redirect("/admin/categories");
    });
  } else {
    res.redirect("/admin/categories");
  }
});

router.get("/admin/categories/edit/:id", adminAuth, (req, res) => {
  const id = req.params.id;
  if (id) {
    Category.findByPk(id).then((category) => {
      res.render("admin/categories/edit", { category });
    });
  }
});

router.get("/categories/:slug", (req, res) => {
  const slug = req.params.slug;
  if (slug) {
    Category.findOne({
      where: {
        slug,
      },
      include: [{ model: Article }],
    }).then((category) => {
      Category.findAll().then((categories) => {
        res.render("index", {
          articles: category.articles,
          category,
          categories,
        });
      });
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
