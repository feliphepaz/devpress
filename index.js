const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connection = require("./database/connection");
const articlesController = require("./articles/ArticlesController");
const categoriesController = require("./categories/CategoriesController");
const Article = require("./articles/Article");
const Category = require("./categories/Category");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(8080, () => {
  console.log("Servidor rodando");
});
