const sequelize = require("sequelize");

const path = require("path");

const sequelize = new sequelize.Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../db/db.sqlite"),
  logging: false,
});
