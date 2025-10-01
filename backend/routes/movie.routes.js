const express = require("express");
const movieController = require("../controllers/movie.controller");

const router = express.Router();

router
  .route("/")
  .post(movieController.createMovie)
  .get(movieController.getMovies);

router.route("/import").post(movieController.createManyMovies);

router
  .route("/:id")
  .get(movieController.getMovieById)
  .patch(movieController.updateMovie)
  .delete(movieController.deleteMovie);

module.exports = router;
