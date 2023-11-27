const session = require("express-session");
const express = require("express");
const app = express();
const connection = require("./database/connection");
const articlesController = require("./articles/ArticlesController");
const categoriesController = require("./categories/CategoriesController");
const usersController = require("./users/UsersController");
const Article = require("./articles/Article");
const Category = require("./categories/Category");

app.set("view engine", "ejs");
app.use(
  session({
    secret: "PjLt3td9kMkZ3N",
    cookie: { maxAge: 10800000 },
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com sucesso");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/", articlesController);
app.use("/", categoriesController);
app.use("/", usersController);

app.get("/", (req, res) => {
  Category.findAll().then((categories) => {
    Article.findAll({
      include: [{ model: Category }],
    }).then((articles) => {
      res.render("index", { articles, category: false, categories });
    });
  });
});

app.listen(8080, () => {
  console.log("Servidor rodando");
});
