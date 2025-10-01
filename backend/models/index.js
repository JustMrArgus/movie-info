const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../db/db.sqlite"),
  logging: false,
});

(async () => {
  await sequelize.query("PRAGMA journal_mode = WAL;");
})();

const Actor = sequelize.define("Actor", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
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
});

Movie.belongsToMany(Actor, { through: "MovieActors", as: "actors" });
Actor.belongsToMany(Movie, { through: "MovieActors", as: "movies" });

module.exports = { sequelize, Movie, Actor };
