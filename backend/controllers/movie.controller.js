const { Movie, Actor } = require("../models/index");
const APIFeatures = require("../utils/apiFeatures");

exports.createMovie = async (req, res) => {
  try {
    const movie = await Movie.create({
      title: req.body.title,
      year: req.body.year,
      format: req.body.format,
    });

    let actors = [];
    if (req.body.actors && req.body.actors.length > 0) {
      actors = await Promise.all(
        req.body.actors.map(async (name) => {
          const [actor] = await Actor.findOrCreate({ where: { name } });
          return actor;
        })
      );

      await movie.setActors(actors);
    }

    const completeMovie = await Movie.findByPk(movie.id, {
      include: [
        {
          model: Actor,
          as: "actors",
          attributes: ["id", "name", "createdAt", "updatedAt"],
          through: { attributes: [] },
        },
      ],
    });

    res.status(201).json({
      data: completeMovie,
      status: 1,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err.message,
      status: 0,
    });
  }
};

exports.createManyMovies = async (req, res) => {
  try {
    const completeMovies = [];

    for (let movieData of req.body) {
      const movie = await Movie.create({
        title: movieData.title,
        year: movieData.year,
        format: movieData.format,
      });

      let actors = [];
      if (movieData.actors && movieData.actors.length > 0) {
        actors = [];
        for (const name of movieData.actors) {
          const [actor] = await Actor.findOrCreate({ where: { name } });
          actors.push(actor);
        }
        await movie.setActors(actors);
      }

      const completeMovie = await Movie.findByPk(movie.id, {
        include: [
          {
            model: Actor,
            as: "actors",
            attributes: ["id", "name", "createdAt", "updatedAt"],
            through: { attributes: [] },
          },
        ],
      });

      completeMovies.push(completeMovie);
    }

    const moviesTotalCount = await Movie.count();

    res.status(200).json({
      data: completeMovies,
      meta: {
        imported: completeMovies.length,
        total: moviesTotalCount,
      },
      status: 1,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err.message,
      status: 0,
    });
  }
};

exports.getMovies = async (req, res) => {
  try {
    const features = new APIFeatures(Movie, req.query)
      .actor()
      .title()
      .search()
      .sort()
      .limit()
      .offset();

    const movies = await features.exec();

    const moviesTotalCount = await Movie.count();

    res.status(200).json({
      data: movies,
      meta: {
        total: moviesTotalCount,
      },
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

    const completeMovie = await Movie.findByPk(movie.id, {
      include: [
        {
          model: Actor,
          as: "actors",
          attributes: ["id", "name", "createdAt", "updatedAt"],
          through: { attributes: [] },
        },
      ],
    });

    res.status(200).json({
      data: completeMovie,
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

    if (req.body.actors) {
      const actors = await Promise.all(
        req.body.actors.map(async (name) => {
          const [actor] = await Actor.findOrCreate({ where: { name } });
          return actor;
        })
      );
      await movie.setActors(actors);
    }

    const completeMovie = await Movie.findByPk(movie.id, {
      include: [
        {
          model: Actor,
          as: "actors",
          attributes: ["id", "name", "createdAt", "updatedAt"],
          through: { attributes: [] },
        },
      ],
    });

    res.status(200).json({
      data: completeMovie,
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
