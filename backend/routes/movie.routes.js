const express = require("express");
const movieController = require("../controllers/movie.controller");
const protect = require("../middleware/protect");
const {
  uploadTxt,
  parseTxtFile,
} = require("../middleware/txtMovieDataHandler");

const router = express.Router();

router.use(protect);

router
  .route("/")
  .post(movieController.createMovie)
  .get(movieController.getMovies);

router
  .route("/import")
  .post(uploadTxt, parseTxtFile, movieController.createManyMovies);

router
  .route("/:id")
  .get(movieController.getMovieById)
  .patch(movieController.updateMovie)
  .delete(movieController.deleteMovie);

module.exports = router;
