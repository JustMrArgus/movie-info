const { Sequelize, DataTypes } = require("sequelize");

const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../db/db.sqlite"),
  logging: false,
});

const Movie = sequelize.define("Movie", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  format: {
    type: DataTypes.ENUM("VHS", "DVD", "Blu-ray"),
    allowNull: false,
  },
  actors: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = { sequelize, Movie };
