const Sequelize = require("sequelize");

const connection = new Sequelize("devpress", "root", "MercenaryMusty@9719", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
