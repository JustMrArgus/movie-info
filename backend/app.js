const express = require("express");
const path = require("path");

const cors = require("cors");

const movieRoutes = require("./routes/movie.routes");
const userRouters = require("./routes/user.routes");
const sessionRoutes = require("./routes/session.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/movies", movieRoutes);
app.use("/api/users", userRouters);
app.use("/api/sessions", sessionRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.get((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
