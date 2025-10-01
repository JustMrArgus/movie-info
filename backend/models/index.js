const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

const bcrypt = require("bcrypt");

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

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  confirmPassword: {
    type: DataTypes.VIRTUAL,
    allowNull: false,
  },
});

User.beforeCreate(async (user) => {
  if (user.password !== user.confirmPassword) {
    throw new Error("Passwords do not match!");
  }
  user.password = await bcrypt.hash(user.password, 12);
});

Movie.belongsToMany(Actor, { through: "MovieActors", as: "actors" });
Actor.belongsToMany(Movie, { through: "MovieActors", as: "movies" });

module.exports = { sequelize, Movie, Actor, User };
