const express = require("express");
const router = express.Router();
const Category = require("./Category");
const Slugify = require("slugify");

router.get("/admin/categories/new", (req, res) => {
  res.render("admin/categories/new");
});

router.get("/admin/categories/edit/:id", (req, res) => {
  const id = req.params.id;
  if (id) {
    Category.findByPk(id).then((category) => {
      res.render("admin/categories/edit", { category });
    });
  }
});

router.post("/categories/save", (req, res) => {
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

router.post("/categories/edit", (req, res) => {
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

router.get("/categories/delete/:id", (req, res) => {
  const id = req.params.id;
  if (id) {
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

router.get("/admin/categories", (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/categories/index", { categories });
  });
});

module.exports = router;
