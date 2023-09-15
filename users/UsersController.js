const express = require("express");
const router = express.Router();
const User = require("./User");
const Category = require("../categories/Category");
const Article = require("../articles/Article");
const bcrypt = require("bcryptjs");

router.get("/register", (req, res) => {
  if (req.session.user != undefined) {
    res.redirect("/admin/articles");
  } else {
    Category.findAll().then((categories) => {
      Article.findAll({
        include: [{ model: Category }],
      }).then((articles) => {
        res.render("admin/users/new", {
          articles,
          category: false,
          categories,
        });
      });
    });
  }
});

router.post("/users/save", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ where: { email } }).then((user) => {
    if (user == undefined) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      if (email && hash) {
        User.create({
          email,
          password: hash,
        }).then(() => {
          req.session.user = {
            email,
          };
          res.redirect("/admin/articles");
        });
      } else {
        res.redirect("/register");
      }
    } else {
      res.redirect("/register");
    }
  });
});

router.get("/login", (req, res) => {
  if (req.session.user != undefined) {
    res.redirect("/admin/articles");
  } else {
    Category.findAll().then((categories) => {
      Article.findAll({
        include: [{ model: Category }],
      }).then((articles) => {
        res.render("admin/users/login", {
          articles,
          category: false,
          categories,
        });
      });
    });
  }
});

router.post("/users/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ where: { email } }).then((user) => {
    if (user != undefined) {
      const authenticated = bcrypt.compareSync(password, user.password);

      if (authenticated) {
        req.session.user = {
          email: user.email,
        };
        res.redirect("/admin/articles");
      }
    } else {
      res.redirect("/login");
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.user = undefined;
  res.redirect("/");
});

module.exports = router;
