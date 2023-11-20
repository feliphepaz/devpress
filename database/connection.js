require("dotenv").config({ path: ".env.local" });
const Sequelize = require("sequelize");

const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    timezone: "-03:00",
  }
);

module.exports = connection;
