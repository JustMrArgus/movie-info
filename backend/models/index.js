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
    validate: {
      notEmpty: { msg: "Name cannot be empty" },
      notNull: { msg: "Name is required" },
      is: {
        args: /\S+/,
        msg: "Name cannot contain only spaces",
      },
    },
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
    validate: {
      notEmpty: { msg: "Title cannot be empty" },
      is: {
        args: /\S+/,
        msg: "Title cannot contain only spaces",
      },
    },
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Year is required" },
      isInt: { msg: "Year must be a number" },
      min: { args: [1850], msg: "Year must be greater than 1850" },
      max: {
        args: [3000],
        msg: "Year cannot be in the future",
      },
    },
  },
  format: {
    type: DataTypes.ENUM("VHS", "DVD", "Blu-ray"),
    allowNull: false,
    validate: {
      notEmpty: { msg: "Format is required" },
      isIn: {
        args: [["VHS", "DVD", "Blu-ray"]],
        msg: "Format must be one of: VHS, DVD, Blu-ray",
      },
    },
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
    validate: {
      notEmpty: { msg: "Email cannot be empty" },
      notNull: { msg: "Email is required" },
      isEmail: { msg: "Invalid email format" },
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Name cannot be empty" },
      is: {
        args: /\S+/,
        msg: "Name cannot contain only spaces",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Password cannot be empty" },
      is: {
        args: /\S+/,
        msg: "Password cannot contain only spaces",
      },
    },
  },
  confirmPassword: {
    type: DataTypes.VIRTUAL,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Confirm password cannot be empty" },
    },
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
