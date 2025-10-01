const express = require("express");

const cors = require("cors");

const movieRoutes = require("./routes/movie.routes");
const userRouters = require("./routes/user.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/users", userRouters);

module.exports = app;
