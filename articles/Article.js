const Sequelize = require("sequelize");
const connection = require("../database/connection");
const Category = require("../categories/Category");

const Article = connection.define("article", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Article.belongsTo(Category);
Category.hasMany(Article);

Article.sync({ force: true });

module.exports = Article;
