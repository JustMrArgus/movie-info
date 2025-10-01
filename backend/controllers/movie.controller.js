const { Movie } = require("../models/index.js");

exports.createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(200).json({
      data: movie,
      status: 1,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
      status: 0,
    });
  }
};

exports.createManyMovies = async (req, res) => {
  try {
    const movies = await Movie.bulkCreate(req.body, { validate: true });
    res.status(200).json({
      data: movies,
      status: 1,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
      status: 0,
    });
  }
};

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.status(200).json({
      data: movies,
      status: 1,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      status: 0,
    });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie)
      return res.status(404).json({ error: "Movie not found", status: 0 });
    res.status(200).json({
      data: movie,
      status: 1,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      status: 0,
    });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie)
      return res.status(404).json({ error: "Movie not found", status: 0 });
    await movie.update(req.body);
    res.status(200).json({
      data: movie,
      status: 1,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
      status: 0,
    });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie)
      return res.status(404).json({ error: "Movie not found", status: 0 });
    await movie.destroy();
    res.status(200).json({
      status: 1,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      status: 0,
    });
  }
};
